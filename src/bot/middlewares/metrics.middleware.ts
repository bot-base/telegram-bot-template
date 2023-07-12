import { Middleware } from "grammy";
import type { Context } from "~/bot/context";
import { updateCounter, updateFailedCounter } from "~/metrics";

export function metrics(): Middleware<Context> {
  return async (ctx, next) => {
    try {
      updateCounter.inc({
        from_id: ctx.from?.id,
        chat_id: ctx.chat?.id,
      });
      return await next();
    } catch (error) {
      updateFailedCounter.inc({
        from_id: ctx.from?.id,
        chat_id: ctx.chat?.id,
      });
      throw error;
    }
  };
}
