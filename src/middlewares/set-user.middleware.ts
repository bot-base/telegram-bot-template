import { NextFunction } from "grammy";

import { Context } from "@bot/types";
import { usersService } from "@bot/services";

export const middleware = () => async (ctx: Context, next: NextFunction) => {
  if (ctx.from?.is_bot === false) {
    const { id: telegramId, language_code: languageCode } = ctx.from;

    ctx.local.user = await usersService.upsertByTelegramId(telegramId, {
      languageCode,
    });
  }

  return next();
};
