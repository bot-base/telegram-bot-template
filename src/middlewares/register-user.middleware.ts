import { NextFunction } from "grammy";

import { Context } from "@bot/types";
import { usersService } from "@bot/services";
import { logger } from "@bot/logger";

export const middleware = () => async (ctx: Context, next: NextFunction) => {
  if (ctx.from?.is_bot === false) {
    logger.info({
      msg: "trying to register a user",
      telegramId: ctx.from.id,
    });

    const { id: telegramId, language_code: languageCode } = ctx.from;

    ctx.user = await usersService.createByTelegramId(telegramId, {
      languageCode,
    });
  }

  return next();
};
