import { Middleware, StorageAdapter, session as createSession } from "grammy";
import type { Context } from "~/bot/context";

type ContextWithoutSession = Omit<Context, "session">;
export const session = (
  storage: StorageAdapter<unknown>
): Middleware<Context> =>
  createSession({
    initial: () => ({}),
    storage,
    getSessionKey(ctx: ContextWithoutSession) {
      const chatId = ctx.chat?.id ?? ctx.inlineQuery?.from?.id;
      // Give every user their one personal session storage per bot
      // (an independent session for the same user in each bot)
      return chatId === undefined || ctx.me === undefined
        ? undefined
        : `${chatId}/${ctx.me.id}`;
    },
  });
