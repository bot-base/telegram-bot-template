import pino, {
  type DestinationStream,
  type Logger,
  type LoggerOptions,
} from "pino";

import { config } from "~/config";

const options: LoggerOptions = {
  level: config.LOG_LEVEL,
};

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      level: config.LOG_LEVEL,
      options: {
        ...(config.isDev && {
          ignore: "pid,hostname",
          colorize: true,
          translateTime: true,
        }),
      },
    },
  ],
}) as DestinationStream;

export const logger = pino(options, transport);
