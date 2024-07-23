<h1 align="center">🤖 Telegram Bot Template</h1>

<img align="right" width="35%" src="https://github.com/bot-base/telegram-bot-template/assets/26162440/c4371683-3e99-4b1c-ae8e-11ccbea78f4b">

Bot starter template based on [grammY](https://grammy.dev/) bot framework.

## Features

- Scalable structure
- Config loading and validation
- Internationalization, language changing
- Graceful shutdown
- Logger (powered by [pino](https://github.com/pinojs/pino))
- Ultrafast and multi-runtime server (powered by [hono](https://github.com/honojs/hono))
- Ready-to-use deployment setups:
    - [Docker](#docker-dockercom)
    - [Vercel](#vercel-vercelcom)
- Examples:
    - grammY plugins:
        - [Conversations](#grammy-conversations-grammydevpluginsconversations)
    - Databases:
      - [Prisma ORM](#prisma-orm-prismaio)
    - Runtimes:
      - [Bun](#bun-bunsh)

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

    Install only production dependencies:
    ```bash
    npm install --only=prod
    ```

    Set `DEBUG` environment variable to `false` in your `.env` file.

    Start the bot in production mode:
    ```bash
    npm run start:force # skip type checking and start
    # or
    npm start # with type checking (requires development dependencies)
    ```

### List of Available Commands

- `npm run lint` — Lint source code.
- `npm run format` — Format source code.
- `npm run typecheck` — Run type checking.
- `npm run dev` — Start the bot in development mode.
- `npm run start` — Start the bot.
- `npm run start:force` — Starts the bot without type checking.

### Directory Structure

```
project-root/
  ├── locales # Localization files
  └── src
      ├── bot # Code related to bot
      │   ├── callback-data # Callback data builders
      │   ├── features      # Bot features
      │   ├── filters       # Update filters
      │   ├── handlers      # Update handlers
      │   ├── helpers       # Helper functions
      │   ├── keyboards     # Keyboard builders
      │   ├── middlewares   # Bot middlewares
      │   ├── i18n.ts       # Internationalization setup
      │   ├── context.ts    # Context object definition
      │   └── index.ts      # Bot entry point
      ├── server # Code related to web server
      │   ├── middlewares   # Server middlewares
      │   ├── environment   # Server environment setup
      │   └── index.ts      # Server entry point
      ├── config.ts # Application config
      ├── logger.ts # Logging setup
      └── main.ts   # Application entry point
```

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

3. Follow [the usage instructions](https://github.com/bot-base/telegram-bot-template/tree/deploy/docker-compose#usage) in the `deploy/docker-compose` branch.

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

3. Follow [the usage instructions](https://github.com/bot-base/telegram-bot-template/tree/deploy/vercel#usage) in the `deploy/vercel` branch.

## Examples

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

3. Install dependencies

```sh
npm i @grammyjs/conversations
```

4. Follow [the usage instructions](https://github.com/bot-base/telegram-bot-template/tree/example/plugin-conversations#usage) in the `example/plugin-conversations` branch.

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

3. Install dependencies

```sh
npm i -D prisma
npm i @prisma/client
```

4. Follow [the usage instructions](https://github.com/bot-base/telegram-bot-template/tree/example/orm-prisma#usage) in the `example/orm-prisma` branch.

### Bun ([bun.sh](https://bun.sh))

Branch:
[example/runtime-bun](https://github.com/bot-base/telegram-bot-template/tree/example/runtime-bun)
([open diff](https://github.com/bot-base/telegram-bot-template/compare/example/runtime-bun))

Use in your project:

1. Add the template repository as a remote

```sh
git remote add template git@github.com:bot-base/telegram-bot-template.git
git remote update
```

2. Merge example

```sh
git merge template/example/runtime-bun -X theirs --squash --no-commit --allow-unrelated-histories
```

3. Install dependencies

```sh
# remove Node-related dependencies
npm r @types/node tsx tsc-watch

# install dependencies
bun i

# remove npm lockfile
rm package-lock.json

# install bun typings
bun add -d @types/bun
```

4. Follow [the usage instructions](https://github.com/bot-base/telegram-bot-template/tree/example/runtime-bun#usage) in the `example/runtime-bun` branch.

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
    <td>BOT_TOKEN</td>
    <td>
        String
    </td>
    <td>
        Telegram Bot API token obtained from <a href="https://t.me/BotFather">@BotFather</a>.
    </td>
  </tr>
  <tr>
    <td>BOT_MODE</td>
    <td>
        String
    </td>
    <td>
        Specifies method to receive incoming updates (<code>polling</code> or <code>webhook</code>).
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
        Use <code>info</code> for general logging. Check the <a href="https://github.com/pinojs/pino/blob/master/docs/api.md#level-string">Pino documentation</a> for more log level options. <br/>
        Defaults to <code>info</code>.
    </td>
  </tr>
  <tr>
    <td>DEBUG</td>
    <td>Boolean</td>
    <td>
      <i>Optional.</i>
      Enables debug mode. You may use <code>config.isDebug</code> flag to enable debugging functions.
    </td>
  </tr>
  <tr>
    <td>BOT_WEBHOOK</td>
    <td>
        String
    </td>
    <td>
        <i>Optional in <code>polling</code> mode.</i>
        Webhook endpoint URL, used to configure webhook.
    </td>
  </tr>
  <tr>
    <td>BOT_WEBHOOK_SECRET</td>
    <td>
        String
    </td>
    <td>
        <i>Optional in <code>polling</code> mode.</i>
        A secret token that is used to ensure that a request is sent from Telegram, used to configure webhook.
    </td>
  </tr>
  <tr>
    <td>SERVER_HOST</td>
    <td>
        String
    </td>
    <td>
        <i>Optional in <code>polling</code> mode.</i> Specifies the server hostname. <br/>
        Defaults to <code>0.0.0.0</code>.
    </td>
  </tr>
  <tr>
    <td>SERVER_PORT</td>
    <td>
        Number
    </td>
    <td>
        <i>Optional in <code>polling</code> mode.</i> Specifies the server port. <br/>
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
        Defaults to an empty array (all update types except <code>chat_member</code>, <code>message_reaction</code> and <code>message_reaction_count</code>).
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
