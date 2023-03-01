<h1 align="center">🤖 Telegram Bot Template</h1>

Bot starter template based on [grammY](https://grammy.dev/) bot framework and [Prisma ORM](https://www.prisma.io/).  
Uses PostgreSQL for data storage (MySQL, MongoDB, SQL Server, SQLite [are also supported by Prisma](https://www.prisma.io/docs/reference/database-reference/supported-databases)) and Redis for session storage.

## Features

- Config loading and validation
- Logger
- Dependency injection
- Session storage
- Internationalization with language change
- Graceful shutdown
- Metrics collection (in [prometheus](https://prometheus.io/) format)
- Fast and low overhead [fastify](https://www.fastify.io/) server
- Ready-to-use Docker setup

## Usage

Clone this repo or generate new repo using this template via [link](https://github.com/bot-base/telegram-bot-template/generate)

```bash
git clone https://github.com/bot-base/telegram-bot-template
```

<details>
<summary>Launch</summary>

1.  Create environment variables file

```bash
cp .example.bot.env .env
```

2.  Edit [environment variables](#environment-variables-reference) in `.env`

3.  Launch bot

    Development mode:

    ```bash
    # install dependencies
    npm i

    # run migrations
    npx prisma migrate deploy

    # run bot
    npm run dev
    ```

    Production mode:

    ```bash
    # install dependencies
    npm i --only=prod

    # run migrations
    npx prisma migrate deploy

    # build bot
    npm run build

    # run bot
    npm start
    ```

</details>

<details>
<summary>Launch using Docker</summary>

1.  Create development and production environment variables files

```bash
# development
cp .example.bot.env docker-compose.dev.bot.env
cp .example.postgres.env docker-compose.dev.postgres.env

# production
cp .example.bot.env docker-compose.prod.bot.env
cp .example.postgres.env docker-compose.prod.postgres.env
```

2.  Edit [environment variables](#environment-variables-reference) in `docker-compose.dev.bot.env` and `docker-compose.prod.bot.env`

3.  Launch bot

    Development mode:

    ```bash
    # install dependencies
    npm i

    # run migrations
    docker compose run bot npx prisma migrate deploy

    # run bot
    docker compose up
    ```

    Production mode:

    ```bash
    # run migrations
    docker compose -f docker-compose.yml -f docker-compose.prod.yml run bot npx prisma migrate deploy

    # run bot
    docker compose -f docker-compose.yml -f docker-compose.prod.yml up
    ```

</details>

## Examples

- [Conversations](https://github.com/bot-base/telegram-bot-template/compare/examples/conversations)
- [Queues](https://github.com/bot-base/telegram-bot-template/compare/examples/queues)

## Environment variables reference

| Variable            | Description                                                                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NODE_ENV            | Node environment                                                                                                                                          |
| LOG_LEVEL           | Log level                                                                                                                                                 |
| CHECKPOINT_DISABLE  | [Prisma Telemetry](https://www.prisma.io/docs/concepts/more/telemetry)                                                                                    |
| DATABASE_URL        | Database URL                                                                                                                                              |
| REDIS_URL           | Redis URL                                                                                                                                                 |
| BOT_SERVER_HOST     | Server address                                                                                                                                            |
| BOT_SERVER_PORT     | Server port                                                                                                                                               |
| BOT_ALLOWED_UPDATES | List of [update types](https://core.telegram.org/bots/api#update) to receive                                                                              |
| BOT_TOKEN           | Token, get it from [@BotFather](https://t.me/BotFather)                                                                                                   |
| BOT_WEBHOOK         | <details><summary>Webhook endpoint</summary>Used for setup a webhook in production mode.</details>                                                        |
| BOT_ADMIN_USER_ID   | <details><summary>Administrator user ID</summary>Commands, such as `/stats` or `/setcommands`, will only be available to the user with this ID.</details> |
