import { NextFunction } from "grammy";

import { logger } from "@bot/logger";
import { Context } from "@bot/types";

export const middleware = () => (ctx: Context, next: NextFunction) => {
  logger.debug({
    msg: "update received",
    ...ctx.update,
  });
  return next();
};
