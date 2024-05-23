import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { webhookCallback } from 'grammy'
import { getPath } from 'hono/utils/url'
import { requestId } from './middlewares/request-id.js'
import { logger } from './middlewares/logger.js'
import type { Bot } from '#root/bot/index.js'
import { config } from '#root/config.js'
import { requestLogger } from '#root/server/middlewares/request-logger.js'
import type { Logger } from '#root/logger.js'

interface Env {
  Variables: {
    requestId: string
    logger: Logger
  }
}

export function createServer(bot: Bot) {
  const server = new Hono<Env>()

  server.use(requestId())
  server.use(logger())

  if (config.isDev)
    server.use(requestLogger())

  server.onError(async (error, c) => {
    if (error instanceof HTTPException) {
      if (error.status < 500)
        c.var.logger.info(error)
      else
        c.var.logger.error(error)

      return error.getResponse()
    }

    // unexpected error
    c.var.logger.error({
      err: error,
      method: c.req.raw.method,
      path: getPath(c.req.raw),
    })
    return c.json(
      {
        error: 'Oops! Something went wrong.',
      },
      500,
    )
  })

  server.get('/', c => c.json({ status: true }))

  server.post(
    '/webhook',
    webhookCallback(bot, 'hono', {
      secretToken: config.BOT_WEBHOOK_SECRET,
    }),
  )

  return server
}

export type Server = Awaited<ReturnType<typeof createServer>>
