import { Middleware } from "grammy";
import { User, Chat } from "grammy/types";
import { Context } from "~/bot/types";
import { logger } from "~/logger";
import { metrics } from "~/metrics";

interface LogMetadata {
  message_id: number | undefined;
  chat: Chat | undefined;
  peer: User | Chat | undefined;
}

export const getPeer = (ctx: Context): Chat | User | undefined =>
  ctx.senderChat || ctx.from;

export const getMetadata = (ctx: Context): LogMetadata => ({
  message_id: ctx.msg?.message_id,
  chat: ctx.chat,
  peer: getPeer(ctx),
});

export const logHandle =
  (id: string): Middleware<Context> =>
  (ctx, next) => {
    metrics.updateHandledCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
      handler_id: id,
    });
    logger.info({
      msg: `handle ${id}`,
      ...getMetadata(ctx),
    });

    return next();
  };
