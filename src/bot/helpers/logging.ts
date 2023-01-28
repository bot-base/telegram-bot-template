import { Middleware } from "grammy";
import { Chat, User } from "grammy/types";
import { Context } from "~/bot/types";
import { updateHandledCounter } from "~/metrics";

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
    updateHandledCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
      handler_id: id,
    });

    ctx.logger.info({
      msg: `handle ${id}`,
      ...getMetadata(ctx),
    });

    return next();
  };
