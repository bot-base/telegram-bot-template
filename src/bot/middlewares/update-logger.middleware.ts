import { Middleware } from "grammy";
import type { Context } from "~/bot/context";
import { getFullMetadata } from "~/bot/helpers/logging";

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
    ...getFullMetadata(ctx),
  });

  return next();
};
