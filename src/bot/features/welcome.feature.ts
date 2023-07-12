import { Composer } from "grammy";
import type { Context } from "~/bot/context";
import { logHandle } from "~/bot/helpers/logging";

const composer = new Composer<Context>();

const feature = composer.chatType("private");

feature.command("start", logHandle("command-start"), (ctx) =>
  ctx.reply(ctx.t("welcome")),
);

export { composer as welcomeFeature };
