import { Middleware } from "grammy";

import { logger } from "~/logger";
import { Context } from "~/bot/types";

export const updateLogger = (): Middleware<Context> => (ctx, next) => {
  logger.debug({
    msg: "update received",
    ...ctx.update,
  });

  return next();
};
