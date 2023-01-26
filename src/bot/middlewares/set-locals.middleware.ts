import { Middleware } from "grammy";
import { Role } from "@prisma/client";

import { Context } from "~/bot/types";
import { usersService } from "~/services";
import { config } from "~/config";

export const setLocals = (): Middleware<Context> => async (ctx, next) => {
  ctx.local = {};

  if (ctx.from?.is_bot === false) {
    const { id: telegramId, language_code: languageCode } = ctx.from;
    const role =
      ctx.from.id === config.BOT_ADMIN_USER_ID ? Role.OWNER : undefined;

    ctx.local.user = await usersService.upsertByTelegramId(telegramId, {
      create: {
        languageCode,
        role,
      },
      update: {
        role,
      },
    });
  }

  return next();
};
