import { Composer } from "grammy";
import { logHandle } from "~/bot/helpers/logging";
import { Context } from "~/bot/types";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), (ctx) =>
  ctx.reply(ctx.t("welcome"))
);

export { composer as welcomeFeature };
