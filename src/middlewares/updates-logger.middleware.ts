import { Middleware } from "grammy";

import { logger } from "@bot/logger";
import { Context } from "@bot/types";

export const middleware = (): Middleware<Context> => (ctx, next) => {
  logger.debug({
    msg: "update received",
    ...ctx.update,
  });
  return next();
};
