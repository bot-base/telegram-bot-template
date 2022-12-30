import { Middleware } from "grammy";

import { Context } from "~/bot/types";
import { metrics } from "~/metrics";

export const middleware = (): Middleware<Context> => async (ctx, next) => {
  try {
    metrics.updateCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });
    return await next();
  } catch (e) {
    metrics.updateFailedCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });
    throw e;
  }
};
