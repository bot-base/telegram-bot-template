import { pino } from 'pino'
import type { Config } from './config.js'

export function createLogger(config: Config) {
  return pino({
    level: config.logLevel,
    transport: {
      targets: [
        ...(config.isDebug
          ? [
              {
                target: 'pino-pretty',
                level: config.logLevel,
                options: {
                  ignore: 'pid,hostname',
                  colorize: true,
                  translateTime: true,
                },
              },
            ]
          : [
              {
                target: 'pino/file',
                level: config.logLevel,
                options: {},
              },
            ]),
      ],
    },
  })
}

export type Logger = ReturnType<typeof createLogger>
