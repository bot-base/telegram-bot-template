import { Composer } from "grammy";
import { changeLanguageData } from "~/bot/callback-data";
import { logHandle } from "~/bot/helpers/logging";
import { i18n } from "~/bot/i18n";
import { createChangeLanguageKeyboard } from "~/bot/keyboards";
import { Context } from "~/bot/types";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("language", logHandle("command-language"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("language.select"), {
    reply_markup: await createChangeLanguageKeyboard(ctx),
  });
});

feature.callbackQuery(changeLanguageData.filter(), async (ctx) => {
  const { userService } = ctx.container.items;
  const { code: languageCode } = changeLanguageData.unpack(
    ctx.callbackQuery.data
  );

  if (i18n.locales.includes(languageCode)) {
    ctx.scope.user = await userService.updateByTelegramId(ctx.from.id, {
      data: {
        languageCode,
      },
    });

    await ctx.i18n.renegotiateLocale();

    await ctx.editMessageText(ctx.t("language.changed"), {
      reply_markup: await createChangeLanguageKeyboard(ctx),
    });
  }
});

export { composer as languageSelectFeature };
