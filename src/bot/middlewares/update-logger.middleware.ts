import { Middleware } from "grammy";
import { Context } from "~/bot/context";

export const updateLogger = (): Middleware<Context> => (ctx, next) => {
  ctx.api.config.use((prev, method, payload, signal) => {
    ctx.logger.debug({
      msg: "bot api call",
      method,
      payload,
    });

    return prev(method, payload, signal);
  });

  ctx.logger.debug({
    msg: "update received",
    ...ctx.update,
  });

  return next();
};
