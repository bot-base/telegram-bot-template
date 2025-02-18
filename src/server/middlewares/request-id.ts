import type { MiddlewareHandler } from 'hono'
import { randomUUID } from 'node:crypto'

export function requestId(): MiddlewareHandler {
  return async (c, next) => {
    c.set('requestId', randomUUID())

    await next()
  }
}
