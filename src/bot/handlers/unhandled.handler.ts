import { Middleware } from "grammy";
import { Context } from "~/bot/context";

export const unhandledHandler: Middleware<Context> = (ctx) =>
  ctx.reply(ctx.t("unhandled"));
