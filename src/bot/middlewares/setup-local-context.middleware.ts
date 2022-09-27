import { Middleware } from "grammy";

import { context, LocalContext } from "~/bot/context";
import { Context } from "~/bot/types";

export const middleware = (): Middleware<Context> => (ctx, next) => {
  return context.run({}, () => {
    ctx.local = context.getStore() as LocalContext;
    return next();
  });
};
