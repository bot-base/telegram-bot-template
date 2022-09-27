import pino, { Logger, LoggerOptions } from "pino";
import pretty from "pino-pretty";

import { config } from "~/config";
import { context } from "~/bot/context";

const options: LoggerOptions = {
  level: config.LOG_LEVEL,
};

// eslint-disable-next-line import/no-mutable-exports
export let rawLogger = pino(options);

if (config.isDev) {
  rawLogger = pino(
    options,
    pretty({
      ignore: "pid,hostname",
      colorize: true,
      translateTime: true,
    })
  );
}

export const logger: Logger = new Proxy(rawLogger, {
  get(target, property, receiver) {
    // eslint-disable-next-line no-param-reassign
    target = context.getStore()?.logger || target;
    return Reflect.get(target, property, receiver);
  },
});
