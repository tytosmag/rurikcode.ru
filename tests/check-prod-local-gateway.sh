#!/usr/bin/env bash

###################
# Что делает скрипт:
# поднимает production-like stack через docker-compose.prod.local.yml
# ждёт gateway
# проверяет, что gateway проксирует на client:80
# проверяет HTTP 200/304
# проверяет, что client напрямую на 8081 содержит cdn.rurikcode.ru
# проверяет, что gateway на 8082 отдаёт HTML со ссылками на cdn.rurikcode.ru
# при ошибке показывает логи gateway и client
# после завершения останавливает stack
###################

set -euo pipefail

COMPOSE="sudo docker compose -f docker-compose.yml -f docker-compose.prod.local.yml"

CLIENT_URL="${CLIENT_URL:-http://localhost:8081/}"
GATEWAY_URL="${GATEWAY_URL:-http://localhost:8082/}"
CDN_HOST="${CDN_HOST:-cdn.rurikcode.ru}"

BUILD_LOG_FILE="$(mktemp)"
DOWN_LOG_FILE="$(mktemp)"

cleanup() {
  echo

  if $COMPOSE down > "${DOWN_LOG_FILE}" 2>&1; then
    echo "Docker compose down completed"
  else
    echo "Docker compose down failed"
    echo
    cat "${DOWN_LOG_FILE}"
  fi

  rm -f "${BUILD_LOG_FILE}" "${DOWN_LOG_FILE}"
}

trap cleanup EXIT

print_progress_bar() {
  local percent="$1"
  local label="${2:-Building}"
  local width=30
  local filled=$((percent * width / 100))
  local empty=$((width - filled))

  local bar_filled
  local bar_empty

  bar_filled="$(printf "%${filled}s" | tr ' ' '#')"
  bar_empty="$(printf "%${empty}s" | tr ' ' '-')"

  printf "\r%s [%s%s] %3d%%" "${label}" "${bar_filled}" "${bar_empty}" "${percent}"
}

run_build_with_progress() {
  echo "Starting production-like stack..."
  echo

  (
    $COMPOSE up -d --build > "${BUILD_LOG_FILE}" 2>&1
  ) &

  local build_pid=$!
  local percent=0

  while kill -0 "${build_pid}" 2>/dev/null; do
    if [ "${percent}" -lt 95 ]; then
      percent=$((percent + 1))
    fi

    print_progress_bar "${percent}" "Building"
    sleep 0.2
  done

  if wait "${build_pid}"; then
    print_progress_bar 100 "Building"
    echo
    echo "Build completed"
  else
    echo
    echo "Build failed"
    echo
    cat "${BUILD_LOG_FILE}"
    exit 1
  fi
}

echo "========================================"
echo " Production-like gateway check"
echo "========================================"
echo
echo "Client URL:  ${CLIENT_URL}"
echo "Gateway URL: ${GATEWAY_URL}"
echo "CDN host:    ${CDN_HOST}"
echo

run_build_with_progress

echo
echo "Waiting for gateway container..."

until [ "$($COMPOSE ps -q gateway | xargs -r sudo docker inspect -f '{{.State.Running}}' 2>/dev/null || true)" = "true" ]; do
  echo "Gateway is not ready yet..."
  sleep 1
done

echo "Gateway is running."

echo
echo "Checking that gateway has upstream client..."
if $COMPOSE exec -T gateway sh -c "cat /etc/nginx/nginx.conf | grep -q 'upstream client'"; then
  echo "OK: gateway has upstream client"
else
  echo "ERROR: gateway upstream client not found"
  echo
  echo "Gateway nginx config:"
  $COMPOSE exec -T gateway cat /etc/nginx/nginx.conf
  exit 1
fi

echo
echo "Checking that gateway points to production client port..."
if $COMPOSE exec -T gateway sh -c "cat /etc/nginx/nginx.conf | grep -q 'server client:80;'"; then
  echo "OK: gateway points to client:80"
else
  echo "ERROR: gateway does not point to client:80"
  echo
  echo "Gateway nginx config:"
  $COMPOSE exec -T gateway cat /etc/nginx/nginx.conf
  exit 1
fi

echo
echo "Checking HTTP response from ${GATEWAY_URL}..."

for i in {1..30}; do
  STATUS="$(curl -s -o /dev/null -w "%{http_code}" "${GATEWAY_URL}" || true)"

  if [ "${STATUS}" = "200" ] || [ "${STATUS}" = "304" ]; then
    echo "OK: production-like gateway returned HTTP ${STATUS}"
    break
  fi

  echo "Attempt ${i}: HTTP ${STATUS}. Waiting..."
  sleep 1

  if [ "${i}" = "30" ]; then
    echo "ERROR: production-like gateway check failed."
    echo
    echo "Gateway logs:"
    $COMPOSE logs --tail=100 gateway
    echo
    echo "Client logs:"
    $COMPOSE logs --tail=100 client
    exit 1
  fi
done

echo
echo "Checking that client directly contains CDN URL..."
if curl -fsS "${CLIENT_URL}" | grep -q "${CDN_HOST}"; then
  echo "OK: client contains ${CDN_HOST}"
else
  echo "ERROR: client does not contain ${CDN_HOST}"
  echo
  echo "Client response preview:"
  curl -fsS "${CLIENT_URL}" | head -n 30 || true
  echo
  echo "Client logs:"
  $COMPOSE logs --tail=100 client
  exit 1
fi

echo
echo "Checking that gateway response contains CDN URL..."
if curl -fsS "${GATEWAY_URL}" | grep -q "${CDN_HOST}"; then
  echo "OK: gateway response contains ${CDN_HOST}"
else
  echo "ERROR: gateway response does not contain ${CDN_HOST}"
  echo
  echo "Gateway response preview:"
  curl -fsS "${GATEWAY_URL}" | head -n 30 || true
  echo
  echo "Gateway logs:"
  $COMPOSE logs --tail=100 gateway
  echo
  echo "Client logs:"
  $COMPOSE logs --tail=100 client
  exit 1
fi

echo
echo "========================================"
echo "Production-like gateway check passed"
echo "========================================"