import { ErrorHandler } from "grammy";
import type { Context } from "~/bot/context";
import { getFullMetadata } from "~/bot/helpers/logging";

export const errorHandler: ErrorHandler<Context> = (error) => {
  const { ctx } = error;
  const err = error.error;

  ctx.logger.error({
    err,
    ...getFullMetadata(ctx),
  });
};
