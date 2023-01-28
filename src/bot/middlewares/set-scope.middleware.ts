import { Role } from "@prisma/client";
import { Middleware } from "grammy";
import { Context } from "~/bot/types";

export const setScope = (): Middleware<Context> => async (ctx, next) => {
  const { config, userService } = ctx.container.items;

  if (ctx.from?.is_bot === false) {
    const { id: telegramId, language_code: languageCode } = ctx.from;
    const role =
      ctx.from.id === config.BOT_ADMIN_USER_ID ? Role.OWNER : undefined;

    ctx.scope.user = await userService.upsertByTelegramId(telegramId, {
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
