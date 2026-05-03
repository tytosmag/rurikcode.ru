# Код Рюрика
<p>
  <a href="https://github.com/tytosmag/rurikcode.ru/actions/workflows/ci-cd.yml">
    <img src="https://github.com/tytosmag/rurikcode.ru/actions/workflows/ci-cd.yml/badge.svg?branch=develop" alt="CI/CD Pipeline" />
  </a>
  <img src="https://img.shields.io/badge/Docker-GHCR-blue?logo=docker" />
  <img src="https://img.shields.io/badge/Node.js-20.x-green?logo=node.js" />
  <img src="https://img.shields.io/badge/React-19-blue?logo=react" />
  <img src="https://img.shields.io/badge/PostgreSQL-16-blue?logo=postgresql" />
  <img src="https://img.shields.io/badge/Security-CodeQL%20%2B%20TruffleHog-purple" />
</p>

**Код Рюрика** — интерактивная историческая игра-квест с микросервисной архитектурой, авторизацией, игровым прогрессом и таблицей лидеров.

---

## Ссылки

| Окружение | URL |
|----------|-----|
| Staging  | https://staging.rurikcode.ru |
| Production | https://rurikcode.ru |

---

## Архитектура

```text
rurikcode.ru/
├── auth-service/
├── leaderboard-service/
├── game-service/
├── client/
├── gateway/
├── docker-compose.yml
├── docker-compose.staging.yml
└── docker-compose.production.yml