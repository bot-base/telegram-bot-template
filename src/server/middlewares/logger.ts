import type { MiddlewareHandler } from 'hono'
import { logger as _logger } from '#root/logger.js'

export function logger(): MiddlewareHandler {
  return async (c, next) => {
    c.set(
      'logger',
      _logger.child({
        requestId: c.get('requestId'),
      }),
    )

    await next()
  }
}
