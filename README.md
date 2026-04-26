# rurikcode.ru

### Останавливаем docker-compose:
```bash
$ sudo docker-compose down
```

### Обычный запуск docker-compose:
```bash
$ docker-compose up
```

### Запускаем docker-compose с пересборкой проекта:
```bash
$ sudo docker-compose up --build
```

### Рестарт приложения одной командой:
```bash
$ sudo docker-compose restart app
```

### Полный сброс данных (ключ -v удаляет данные Postgres)
```bash
$ docker-compose down -v
```

# Миграции
```bash
$ npx knex migrate:make create_users_tables
```
```bash
$ npx knex migrate:latest
```

### Если запустить с флагом -d,
```bash
$ sudo docker-compose up --build -d
```
то можно перезагружать `server` и `client` отдельно:
```bash
$ docker-compose restart server
```
```bash
$ docker-compose restart client
```

### Клиент запускается на:
```bash
http://localhost:5173/
```

### Сервер запускается на:
```bash
http://localhost:3000/
```

# Troubleshooting
### Найти процесс, который занял порт и завершить его:
```bash
$ sudo lsof -i :5432
```
```bash
$ sudo kill -9 1234
```

### Принудительное удаление проблемного контейнера:
```bash
$ sudo docker rm -f ee17a0e9fc07
```

### Посмотр логов контейнера с БД:
```bash
$ sudo docker logs rurik_db
```
