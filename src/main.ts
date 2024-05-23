#!/usr/bin/env tsx

import process from 'node:process'
import type { AddressInfo } from 'node:net'
import { serve } from '@hono/node-server'
import { createBot } from '#root/bot/index.js'
import { config } from '#root/config.js'
import { logger } from '#root/logger.js'
import { createServer } from '#root/server/index.js'

function onShutdown(cleanUp: () => Promise<void>) {
  let isShuttingDown = false
  const handleShutdown = async () => {
    if (isShuttingDown)
      return
    isShuttingDown = true
    logger.info('Shutdown')
    await cleanUp()
  }
  process.on('SIGINT', handleShutdown)
  process.on('SIGTERM', handleShutdown)
}

async function startPolling() {
  const bot = createBot(config.BOT_TOKEN)

  // graceful shutdown
  onShutdown(async () => {
    await bot.stop()
  })

  // start bot
  await bot.start({
    allowed_updates: config.BOT_ALLOWED_UPDATES,
    onStart: ({ username }) =>
      logger.info({
        msg: 'Bot running...',
        username,
      }),
  })
}

async function startWebhook() {
  const bot = createBot(config.BOT_TOKEN)
  const server = createServer(bot)

  let serverHandle: undefined | ReturnType<typeof serve>
  const startServer = () =>
    new Promise<AddressInfo>((resolve) => {
      serverHandle = serve(
        {
          fetch: server.fetch,
          hostname: config.BOT_SERVER_HOST,
          port: config.BOT_SERVER_PORT,
        },
        info => resolve(info),
      )
    })
  const stopServer = async () =>
    new Promise<void>((resolve) => {
      if (serverHandle)
        serverHandle.close(() => resolve())
      else
        resolve()
    })

  // graceful shutdown
  onShutdown(async () => {
    await stopServer()
  })

  // to prevent receiving updates before the bot is ready
  await bot.init()

  // start server
  const info = await startServer()
  logger.info({
    msg: 'Server started',
    url:
      info.family === 'IPv6'
        ? `http://[${info.address}]:${info.port}`
        : `http://${info.address}:${info.port}`,
  })

  // set webhook
  await bot.api.setWebhook(config.BOT_WEBHOOK, {
    allowed_updates: config.BOT_ALLOWED_UPDATES,
    secret_token: config.BOT_WEBHOOK_SECRET,
  })
  logger.info({
    msg: 'Webhook was set',
    url: config.BOT_WEBHOOK,
  })
}

try {
  if (config.BOT_MODE === 'webhook')
    await startWebhook()
  else if (config.BOT_MODE === 'polling')
    await startPolling()
}
catch (error) {
  logger.error(error)
  process.exit(1)
}
