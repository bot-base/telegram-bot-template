import { NextFunction } from "grammy";

import { Context } from "@bot/types";
import { metrics } from "@bot/metrics";

export const middleware = () => async (ctx: Context, next: NextFunction) => {
  try {
    metrics.updatesCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });
    return await next();
  } catch (e) {
    metrics.updatesFailedCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });
    throw e;
  }
};
