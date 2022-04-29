import { NextFunction } from "grammy";

import { context, LocalContext } from "@bot/context";
import { Context } from "@bot/types";

export const middleware = () => (ctx: Context, next: NextFunction) => {
  return context.run({}, () => {
    ctx.local = context.getStore() as LocalContext;
    next();
  });
};
