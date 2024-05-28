import type { Logger } from '#root/logger.js'

export interface Env {
  Variables: {
    requestId: string
    logger: Logger
  }
}
