import { ErrorHandler } from "grammy";
import { Context } from "~/bot/context";

export const errorHandler: ErrorHandler<Context> = (error) => {
  const { ctx } = error;
  const err = error.error;

  ctx.logger.error({
    err,
    ...ctx.update,
  });
};
