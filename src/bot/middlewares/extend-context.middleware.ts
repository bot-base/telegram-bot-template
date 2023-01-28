import { Middleware } from "grammy";

import { Context } from "~/bot/types";
import { Container } from "~/container";

export const extendContext =
  (container: Container): Middleware<Context> =>
  async (ctx, next) => {
    ctx.container = container;
    ctx.logger = container.items.logger;
    ctx.scope = {};

    return next();
  };
