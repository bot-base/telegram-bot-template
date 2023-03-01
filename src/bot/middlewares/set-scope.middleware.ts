import { Middleware } from "grammy";
import type { Context } from "~/bot/context";

export const setScope = (): Middleware<Context> => async (ctx, next) => {
  if (ctx.from?.is_bot === false) {
    const { id: telegramId, language_code: languageCode } = ctx.from;

    ctx.scope.user = await ctx.prisma.user.upsert({
      where: ctx.prisma.user.byTelegramId(telegramId),
      create: {
        telegramId,
        languageCode,
      },
      update: {},
      select: {
        id: true,
        telegramId: true,
        languageCode: true,
        ...ctx.prisma.user.withRoles(),
      },
    });
  }

  return next();
};
