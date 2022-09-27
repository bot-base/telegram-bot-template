import { Composer } from "grammy";

import { Context } from "~/bot/types";
import { logHandle } from "~/bot/helpers/logging";

export const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("handle /start"), async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("welcome"));
});
