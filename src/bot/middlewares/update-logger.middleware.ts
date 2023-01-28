import { Middleware } from "grammy";

import { Context } from "~/bot/types";

export const updateLogger = (): Middleware<Context> => (ctx, next) => {
  ctx.logger.debug({
    msg: "update received",
    ...ctx.update,
  });

  return next();
};
