import type { Prisma } from '@prisma/client'
import { logger } from '#root/logger.js'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
})

export type PrismaClientX = typeof prisma

prisma.$on('query', (event: Prisma.QueryEvent) => {
  logger.debug({
    msg: 'database query',
    query: event.query,
    params: event.params,
    duration: event.duration,
  })
})

prisma.$on('error', (event: Prisma.LogEvent) => {
  logger.error({
    msg: 'database error',
    target: event.target,
    message: event.message,
  })
})

prisma.$on('info', (event: Prisma.LogEvent) => {
  logger.info({
    msg: 'database info',
    target: event.target,
    message: event.message,
  })
})

prisma.$on('warn', (event: Prisma.LogEvent) => {
  logger.warn({
    msg: 'database warning',
    target: event.target,
    message: event.message,
  })
})
