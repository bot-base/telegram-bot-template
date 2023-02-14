import { Middleware } from "grammy";
import { Context } from "~/bot/context";

export const updateLogger = (): Middleware<Context> => (ctx, next) => {
  ctx.logger.debug({
    msg: "update received",
    ...ctx.update,
  });

  return next();
};
