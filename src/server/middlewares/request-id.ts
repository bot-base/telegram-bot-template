import { randomUUID } from 'node:crypto'
import type { MiddlewareHandler } from 'hono'

export function requestId(): MiddlewareHandler {
  return async (c, next) => {
    c.set('requestId', randomUUID())

    await next()
  }
}
