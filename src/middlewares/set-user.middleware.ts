import { Middleware } from "grammy";

import { Context } from "@bot/types";
import { usersService } from "@bot/services";

export const middleware = (): Middleware<Context> => async (ctx, next) => {
  if (ctx.from?.is_bot === false) {
    const { id: telegramId, language_code: languageCode } = ctx.from;

    ctx.local.user = await usersService.upsertByTelegramId(telegramId, {
      create: {
        languageCode,
      },
      update: {
        languageCode,
      },
    });
  }

  return next();
};
