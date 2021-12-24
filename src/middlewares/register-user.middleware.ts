import { NextFunction } from "grammy";

import { Context } from "@bot/types";
import { usersService } from "@bot/services";
import { logger } from "@bot/logger";

export const middleware = () => async (ctx: Context, next: NextFunction) => {
  if (!ctx.session.user.isRegistered && ctx.from && ctx.from.is_bot === false) {
    logger.info({
      msg: "register user",
      telegramId: ctx.from.id,
    });

    const { id: telegramId, language_code: languageCode } = ctx.from;

    await usersService.createByTelegramId(telegramId, {
      languageCode,
    });

    ctx.session.user.isRegistered = true;
  }

  return next();
};
