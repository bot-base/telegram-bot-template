import { Chat, User } from "@grammyjs/types";
import { Context } from "@bot/types";

interface LogMetadata {
  chat: Chat | undefined;
  peer: User | Chat | undefined;
}

export const getMetadata = (ctx: Context): LogMetadata => ({
  chat: ctx.chat,
  peer: ctx.senderChat || ctx.from,
});
