import { Middleware } from "grammy";
import type { Context } from "~/bot/context";
import { getFullMetadata } from "~/bot/helpers/logging";

export function updateLogger(): Middleware<Context> {
  return (ctx, next) => {
    ctx.api.config.use((previous, method, payload, signal) => {
      ctx.logger.debug({
        msg: "bot api call",
        method,
        payload,
      });

      return previous(method, payload, signal);
    });

    ctx.logger.debug({
      msg: "update received",
      ...getFullMetadata(ctx),
    });

    return next();
  };
}
