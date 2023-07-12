import { Composer } from "grammy";
import type { Context } from "~/bot/context";
import { logHandle } from "~/bot/helpers/logging";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.on("message", logHandle("unhandled-message"), (ctx) =>
  ctx.reply(ctx.t("unhandled")),
);

feature.on("callback_query", logHandle("unhandled-callback-query"), (ctx) =>
  ctx.answerCallbackQuery(),
);

export { composer as unhandledFeature };
