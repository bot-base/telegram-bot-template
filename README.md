<h1 align="center">🤖 Telegram Bot Template</h1>

<img align="right" width="35%" src="https://github.com/bot-base/telegram-bot-template/assets/26162440/c4371683-3e99-4b1c-ae8e-11ccbea78f4b">

Bot starter template based on [grammY](https://grammy.dev/) bot framework.  

## Features

- Scalable structure
- Config loading and validation
- Internationalization, language changing
- Graceful shutdown
- Logger (powered by [pino](https://github.com/pinojs/pino))
- Fast and low overhead server (powered by [fastify](https://github.com/fastify/fastify))
- Ready-to-use deployment setups:
    - [Docker](#docker-dockercom)
    - [Vercel](#vercel-vercelcom)
- Examples:
    - [Prisma ORM](#prisma-orm-prismaio)
    - grammY plugins:
        - [Conversations](#grammy-conversations-grammydevpluginsconversations)
        - [Runner](#grammy-runner-grammydevpluginsrunner)
    - Web Apps:
        - [Vanilla](#web-app-vite-typescript) (No frameworks)
        - [Vue](#web-app-with-vue-vue-vite-typescript)

## Usage

1. [Create a new repository](https://github.com/bot-base/telegram-bot-template/generate) using this template.

2.  Create an environment variables file:

```bash
cp .env.example .env
```

3.  Set BOT_TOKEN [environment variable](#environment-variables) in `.env` file.


4.  Launch bot

    Development mode:

    ```bash
    # 1. Install dependencies
    npm i

    # 2. Run bot (in watch mode)
    npm run dev
    ```

    Production mode:

    ```bash
    # 1. Install dependencies
    npm i --only=prod

    # 2. Set NODE_ENV to production and change BOT_WEBHOOK to the actual URL to receive updates

    # 3. Run bot
    npm start 
    # or
    npm run start:force # if you want to skip type checking
    ```

### List of available commands
- `npm run lint` — Lint source code.
- `npm run format` — Format source code.
- `npm run typecheck` — Runs type checking.
- `npm run dev` — Starts the bot in development mode.
- `npm run start` — Starts the bot.
- `npm run start:force` — Starts the bot without type checking.

## Deploy

### Docker ([docker.com](https://docker.com))

Branch:
[deploy/docker-compose](https://github.com/bot-base/telegram-bot-template/tree/deploy/docker-compose) 
([open diff](https://github.com/bot-base/telegram-bot-template/compare/deploy/docker-compose))

Use in your project:

1. Add the template repository as a remote

```sh
git remote add template git@github.com:bot-base/telegram-bot-template.git
git remote update
```

2. Merge deployment setup

```sh
git merge template/deploy/docker-compose -X theirs --squash --no-commit --allow-unrelated-histories
```

### Vercel ([vercel.com](https://vercel.com))

Branch:
[deploy/vercel](https://github.com/bot-base/telegram-bot-template/tree/deploy/vercel) 
([open diff](https://github.com/bot-base/telegram-bot-template/compare/deploy/vercel))

Use in your project:

1. Add the template repository as a remote

```sh
git remote add template git@github.com:bot-base/telegram-bot-template.git
git remote update
```

2. Merge deployment setup

```sh
git merge template/deploy/vercel -X theirs --squash --no-commit --allow-unrelated-histories
```

## Examples

### Prisma ORM ([prisma.io](https://prisma.io))

Branch:
[example/orm-prisma](https://github.com/bot-base/telegram-bot-template/tree/example/orm-prisma) 
([open diff](https://github.com/bot-base/telegram-bot-template/compare/example/orm-prisma))

Use in your project:

1. Add the template repository as a remote

```sh
git remote add template git@github.com:bot-base/telegram-bot-template.git
git remote update
```

2. Merge example

```sh
git merge template/example/orm-prisma -X theirs --squash --no-commit --allow-unrelated-histories
```

### grammY conversations ([grammy.dev/plugins/conversations](https://grammy.dev/plugins/conversations))

Branch:
[example/plugin-conversations](https://github.com/bot-base/telegram-bot-template/tree/example/plugin-conversations) 
([open diff](https://github.com/bot-base/telegram-bot-template/compare/example/plugin-conversations))

Use in your project:

1. Add the template repository as a remote

```sh
git remote add template git@github.com:bot-base/telegram-bot-template.git
git remote update
```

2. Merge example

```sh
git merge template/example/plugin-conversations -X theirs --squash --no-commit --allow-unrelated-histories
```

### grammY runner ([grammy.dev/plugins/runner](https://grammy.dev/plugins/runner))

Branch:
[example/plugin-runner](https://github.com/bot-base/telegram-bot-template/tree/example/plugin-runner) 
([open diff](https://github.com/bot-base/telegram-bot-template/compare/example/plugin-runner))

Use in your project:

1. Add the template repository as a remote

```sh
git remote add template git@github.com:bot-base/telegram-bot-template.git
git remote update
```

2. Merge example

```sh
git merge template/example/plugin-runner -X theirs --squash --no-commit --allow-unrelated-histories
```

### Web App ([Vite](https://vitejs.dev), TypeScript)

Branch:
[example/webapp](https://github.com/bot-base/telegram-bot-template/tree/example/webapp) 
([open diff](https://github.com/bot-base/telegram-bot-template/compare/example/webapp))

Use in your project:

1. Add the template repository as a remote

```sh
git remote add template git@github.com:bot-base/telegram-bot-template.git
git remote update
```

2. Merge example

```sh
git merge template/example/webapp -X theirs --squash --no-commit --allow-unrelated-histories
```

### Web App with Vue ([Vue](https://vuejs.org), [Vite](https://vitejs.dev), TypeScript)

Branch:
[example/webapp-vue](https://github.com/bot-base/telegram-bot-template/tree/example/webapp-vue) 
([open diff](https://github.com/bot-base/telegram-bot-template/compare/example/webapp-vue))

Use in your project:

1. Add the template repository as a remote

```sh
git remote add template git@github.com:bot-base/telegram-bot-template.git
git remote update
```

2. Merge example

```sh
git merge template/example/webapp-vue -X theirs --squash --no-commit --allow-unrelated-histories
```

## Environment Variables

<table>
<thead>
  <tr>
    <th>Variable</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>NODE_ENV</td>
    <td>String</td>
    <td>Application environment (<code>development</code> or <code>production</code>)</td>
  </tr>
  <tr>
    <td>BOT_TOKEN</td>
    <td>
        String
    </td>
    <td>
        Token, get it from <a href="https://t.me/BotFather">@BotFather</a>.
    </td>
  </tr>
  <tr>
    <td>BOT_WEBHOOK</td>
    <td>
        String
    </td>
    <td>
        Webhook endpoint, used to configure webhook in <b>production</b> environment.
    </td>
  </tr>
  <tr>
    <td>LOG_LEVEL</td>
    <td>
        String
    </td>
    <td>
        <i>Optional.</i>
        Application log level. 
        See <a href="https://github.com/pinojs/pino/blob/master/docs/api.md#level-string">Pino docs</a> for a complete list of available log levels. <br/>
        Defaults to <code>info</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_SERVER_HOST</td>
    <td>
        String
    </td>
    <td>
        <i>Optional.</i> Server address. <br/>
        Defaults to <code>0.0.0.0</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_SERVER_PORT</td>
    <td>
        Number
    </td>
    <td>
        <i>Optional.</i> Server port. <br/>
        Defaults to <code>80</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_ALLOWED_UPDATES</td>
    <td>
        Array of String
    </td>
    <td>
        <i>Optional.</i> A JSON-serialized list of the update types you want your bot to receive. See <a href="https://core.telegram.org/bots/api#update">Update</a> for a complete list of available update types. <br/>
        Defaults to an empty array (all update types except <code>chat_member</code>).
    </td>
  </tr>
  <tr>
    <td>BOT_ADMIN_USER_ID</td>
    <td>
        Number or <br> Array of Number
    </td>
    <td>
        <i>Optional.</i> Administrator user ID. Commands such as <code>/setcommands</code> will only be available to a user with this ID. <br/>
        Defaults to an empty array.
    </td>
  </tr>
</tbody>
</table>