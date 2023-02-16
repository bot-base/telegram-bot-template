import { Middleware } from "grammy";
import { Context } from "~/bot/context";

export const setScope = (): Middleware<Context> => async (ctx, next) => {
  const { userService } = ctx.container.items;

  if (ctx.from?.is_bot === false) {
    const { id: telegramId, language_code: languageCode } = ctx.from;

    ctx.scope.user = await userService.upsertByTelegramId(telegramId, {
      create: {
        languageCode,
      },
      update: {},
    });
  }

  return next();
};
