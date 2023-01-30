import { Middleware } from "grammy";
import { Context } from "~/bot/types";

export const unhandledHandler: Middleware<Context> = (ctx) =>
  ctx.reply(ctx.t("unhandled"));
