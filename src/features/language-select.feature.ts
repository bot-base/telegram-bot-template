import { Composer } from "grammy";
import { isPrivate } from "grammy-guard";

import { Context } from "@bot/types";
import { logger } from "@bot/logger";
import { selectLanguageKeyboard } from "@bot/keyboards";

export const composer = new Composer<Context>();

const filteredComposer = composer.filter(isPrivate);

filteredComposer.use(selectLanguageKeyboard);

filteredComposer.command("language", async (ctx) => {
  logger.info({ msg: "handle language", from: ctx.from, chat: ctx.chat });

  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("language_pick"), {
    reply_markup: selectLanguageKeyboard,
  });
});
