import { NextFunction } from "grammy";
import { Chat, User } from "@grammyjs/types";
import { Context } from "@bot/types";
import { logger } from "@bot/logger";

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

export const logCommandHandle = (ctx: Context, next: NextFunction) => {
  const botCommands = ctx.msg?.entities?.filter(
    (entity) => entity.type === "bot_command"
  );

  if (botCommands?.length === 1) {
    const [commandInfo] = botCommands;
    const commandName = ctx.msg?.text?.substring(
      commandInfo.offset,
      commandInfo.offset + commandInfo.length
    );

    logger.info({
      msg: `handle ${commandName}`,
      match: ctx.match,
      ...getMetadata(ctx),
    });
  }

  return next();
};
