import process from 'node:process'
import { handle } from '@hono/node-server/vercel'
import { createBot } from '#root/bot/index.js'
import { createConfig } from '#root/config.js'
import { createServer } from '#root/server/index.js'
import { createLogger } from '#root/logger.js'

// @ts-expect-error create config from environment variables
const config = createConfig(convertKeysToCamelCase(process.env))
const logger = createLogger(config)

const bot = createBot(config.botToken, {
  config,
  logger,
})
const server = createServer({
  bot,
  config,
  logger,
})

export default handle(server)
