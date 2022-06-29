import { Composer } from "grammy";

import { Context } from "@bot/types";
import { selectLanguageKeyboard } from "@bot/keyboards";
import { logCommandHandle } from "@bot/helpers/logging";

export const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.use(selectLanguageKeyboard);

feature.command("language", logCommandHandle, async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("language.select"), {
    reply_markup: selectLanguageKeyboard,
  });
});
