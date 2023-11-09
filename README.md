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

Follow these steps to set up and run your bot using this template:

1. **Create a New Repository**

    Start by creating a new repository using this template. You can do this by clicking [here](https://github.com/bot-base/telegram-bot-template/generate).

2. **Environment Variables Setup**
    
    Create an environment variables file by copying the provided example file:
     ```bash
     cp .env.example .env
     ```
    Open the newly created `.env` file and set the `BOT_TOKEN` environment variable.

3. **Launching the Bot**
    
    You can run your bot in both development and production modes.

    **Development Mode:**
    
    Install the required dependencies:
    ```bash
    npm install
    ```
    Start the bot in watch mode (auto-reload when code changes):
    ```bash
    npm run dev
    ```

   **Production Mode:**
    
    Install only production dependencies (no development dependencies):
    ```bash
    npm install --only=prod
    ```
    
    Set the `NODE_ENV` environment variable to "production" in your `.env` file. Also, make sure to update `BOT_WEBHOOK` with the actual URL where your bot will receive updates.
    ```dotenv
    NODE_ENV=production
    BOT_WEBHOOK=<your_webhook_url>
    ```
    
    Start the bot in production mode:
    ```bash
    npm start
    # or
    npm run start:force # if you want to skip type checking
    ```

### List of Available Commands

- `npm run lint` — Lint source code.
- `npm run format` — Format source code.
- `npm run typecheck` — Run type checking.
- `npm run dev` — Start the bot in development mode.
- `npm run start` — Start the bot.
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
    <td>Specifies the application environment. (<code>development</code> or <code>production</code>)</td>
  </tr>
  <tr>
    <td>BOT_TOKEN</td>
    <td>
        String
    </td>
    <td>
        Telegram Bot API token obtained from <a href="https://t.me/BotFather">@BotFather</a>.
    </td>
  </tr>
    <tr>
    <td>LOG_LEVEL</td>
    <td>
        String
    </td>
    <td>
        <i>Optional.</i>
        Specifies the application log level. <br/>
        For example, use <code>info</code> for general logging. View the <a href="https://github.com/pinojs/pino/blob/master/docs/api.md#level-string">Pino documentation</a> for more log level options. <br/>
        Defaults to <code>info</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_MODE</td>
    <td>
        String
    </td>
    <td>
        <i>Optional.</i>
        Specifies method to receive incoming updates. (<code>polling</code> or <code>webhook</code>)
        Defaults to <code>polling</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_WEBHOOK</td>
    <td>
        String
    </td>
    <td>
        <i>Optional in <code>polling</code> mode.</i>
        Webhook endpoint URL, used to configure webhook in <b>production</b> environment.
    </td>
  </tr>
  <tr>
    <td>BOT_SERVER_HOST</td>
    <td>
        String
    </td>
    <td>
        <i>Optional.</i> Specifies the server hostname. <br/>
        Defaults to <code>0.0.0.0</code>.
    </td>
  </tr>
  <tr>
    <td>BOT_SERVER_PORT</td>
    <td>
        Number
    </td>
    <td>
        <i>Optional.</i> Specifies the server port. <br/>
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
    <td>BOT_ADMINS</td>
    <td>
        Array of Number
    </td>
    <td>
        <i>Optional.</i> 
        Administrator user IDs. 
        Use this to specify user IDs that have special privileges, such as executing <code>/setcommands</code>. <br/>
        Defaults to an empty array.
    </td>
  </tr>
</tbody>
</table>