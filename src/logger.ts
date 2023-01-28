import pino, { type DestinationStream, type LoggerOptions } from "pino";
import { Config } from "~/config";

export const createLogger = (config: Config) => {
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

  return pino(options, transport);
};

export type Logger = ReturnType<typeof createLogger>;
