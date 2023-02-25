import { Context } from "~/bot/context";

export const unhandledHandler = <C extends Context>(ctx: C) =>
  ctx.reply(ctx.t("unhandled"));
