import type { Context } from "~/bot/context";

export const unhandledHandler = <C extends Context>(ctx: C) =>
  ctx.chat && ctx.reply(ctx.t("unhandled"));
