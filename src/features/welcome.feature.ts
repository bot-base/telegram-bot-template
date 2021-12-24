import { Composer } from "grammy";

import { Context } from "@bot/types";
import { isPrivateChat } from "@bot/helpers/filters";
import { logger } from "@bot/logger";

const baseComposer = new Composer<Context>();

export const composer = baseComposer.filter(isPrivateChat);

composer.command("start", async (ctx) => {
  logger.info({ msg: "handle start", from: ctx.from, chat: ctx.chat });

  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("welcome"));
});
