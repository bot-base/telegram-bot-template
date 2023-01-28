import { Composer } from "grammy";
import { logHandle } from "~/bot/helpers/logging";
import { selectLanguageKeyboard } from "~/bot/keyboards";
import { Context } from "~/bot/types";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.use(selectLanguageKeyboard);

feature.command("language", logHandle("command-language"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("language.select"), {
    reply_markup: selectLanguageKeyboard,
  });
});

export { composer as languageSelectFeature };
