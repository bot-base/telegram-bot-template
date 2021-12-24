import { NextFunction } from "grammy";

import { context } from "@bot/context";
import { Context } from "@bot/types";

export const middleware = () => (ctx: Context, next: NextFunction) => {
  const store = new Map();
  return context.run(store, next);
};
