import { NextFunction } from "grammy";
import { Context } from "@bot/types";
import { metricsService } from "@bot/services";

export const middleware = () => async (ctx: Context, next: NextFunction) => {
  try {
    metricsService.updatesCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });
    return await next();
  } catch (e) {
    metricsService.updatesFailedCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });
    throw e;
  }
};
