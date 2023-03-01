import { Composer } from "grammy";
import { changeLanguageData } from "~/bot/callback-data";
import type { Context } from "~/bot/context";
import { logHandle } from "~/bot/helpers/logging";
import { i18n } from "~/bot/i18n";
import { createChangeLanguageKeyboard } from "~/bot/keyboards";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("language", logHandle("command-language"), async (ctx) =>
  ctx.reply(ctx.t("language.select"), {
    reply_markup: await createChangeLanguageKeyboard(ctx),
  })
);

feature.callbackQuery(
  changeLanguageData.filter(),
  logHandle("keyboard-language-select"),
  async (ctx) => {
    const { code: languageCode } = changeLanguageData.unpack(
      ctx.callbackQuery.data
    );

    if (i18n.locales.includes(languageCode)) {
      ctx.scope.user = await ctx.prisma.user.update({
        where: ctx.prisma.user.byTelegramId(ctx.from.id),
        data: {
          languageCode,
        },
      });

      await ctx.i18n.renegotiateLocale();

      await ctx.editMessageText(ctx.t("language.changed"), {
        reply_markup: await createChangeLanguageKeyboard(ctx),
      });
    }
  }
);

export { composer as languageFeature };
