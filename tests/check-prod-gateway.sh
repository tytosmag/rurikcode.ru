#!/usr/bin/env bash
set -euo pipefail

COMPOSE="sudo docker compose -f docker-compose.yml -f docker-compose.prod.yml"
GATEWAY_URL="${GATEWAY_URL:-http://localhost:8080}"

cleanup() {
  echo
  echo "Stopping production-like stack..."
  $COMPOSE down
}

trap cleanup EXIT

echo "Starting production-like stack..."
$COMPOSE up -d --build

echo "Waiting for gateway container..."

until [ "$($COMPOSE ps -q gateway | xargs -r sudo docker inspect -f '{{.State.Running}}' 2>/dev/null || true)" = "true" ]; do
  echo "Gateway is not ready yet..."
  sleep 1
done

echo "Gateway is running."

echo "Checking nginx upstream client..."
$COMPOSE exec gateway cat /etc/nginx/nginx.conf | grep -A3 "upstream client"

echo "Checking that gateway points to production client port..."
$COMPOSE exec gateway sh -c "cat /etc/nginx/nginx.conf | grep -q 'server client:80;'"

echo "Checking HTTP response from ${GATEWAY_URL}..."

for i in {1..30}; do
  STATUS="$(curl -s -o /dev/null -w "%{http_code}" "$GATEWAY_URL" || true)"

  if [ "$STATUS" = "200" ] || [ "$STATUS" = "304" ]; then
    echo "Production-like gateway check passed: HTTP ${STATUS}"
    exit 0
  fi

  echo "Attempt $i: HTTP ${STATUS}. Waiting..."
  sleep 1
done

echo "Production-like gateway check failed."
echo "Gateway logs:"
$COMPOSE logs --tail=100 gateway

echo "Client logs:"
$COMPOSE logs --tail=100 client

exit 1