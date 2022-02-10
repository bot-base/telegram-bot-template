# Telegram Bot Template

Bot starter template based on [grammY](https://grammy.dev/) bot framework and [prisma](https://www.prisma.io/) ORM.  
Uses PostgreSQL for data storage (MySQL, MongoDB, SQL Server, SQLite [are also supported by prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases)) and Redis for session storage.

---

## Features

- Config loading and validation
- Logger
- Sessions
- Language picker and internationalization
- Graceful shutdown
- Metrics collection (in [prometheus](https://prometheus.io/) format)
- Fast and low overhead [fastify](https://www.fastify.io/) server
- Ready-to-use Docker setup

## How to use

1. Clone this repo or generate new repo using this template via [link](https://github.com/bot-base/telegram-bot-template/generate)  

    ```bash
    git clone https://github.com/bot-base/telegram-bot-template
    ```

2. Create development and production environment variables files

    ```bash
    # development
    cp ./docker/bot.env.example ./docker/bot.dev.env
    cp ./docker/postgres.env.example ./docker/postgres.dev.env

    # production
    cp ./docker/bot.env.example ./docker/bot.prod.env
    cp ./docker/postgres.env.example ./docker/postgres.prod.env
    ```

3. Edit environment variables in `docker/bot.dev.env` and `docker/bot.prod.env`

    **`BOT_TOKEN`** — bot token, **required to change**. Get it from [@BotFather](https://t.me/BotFather).  
    **`BOT_WEBHOOK`** — bot webhook url, **required to change in production**. Used for setup a webhook in production mode.  
    `BOT_ADMIN_USER_ID` — administrator user ID. Administrator commands, such as `/stats` or `/setcommands`, will only be available to the user with this ID.  

    `NODE_ENV` — environment (default is `development`, set `production` to use webhook)  
    `LOG_LEVEL` — log level  
    `DATABASE_URL` — database url  
    `REDIS_URL` — redis url  

4. Launch bot

    Development mode:

    ```bash
    # install dependencies
    npm i

    # run migrations
    docker-compose run bot npx prisma migrate deploy

    # run bot
    docker-compose up
    ```

    Production mode:

    ```bash
    # run migrations
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml run bot npx prisma migrate deploy

    # run bot
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
    ```
