import { Composer } from "grammy";
import { isPrivate } from "grammy-guard";

import { Context } from "@bot/types";
import { logCommandHandle } from "@bot/helpers/logging";

export const composer = new Composer<Context>();

const filteredComposer = composer.filter(isPrivate);

filteredComposer.command("start", logCommandHandle, async (ctx) => {
  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("welcome"));
});
