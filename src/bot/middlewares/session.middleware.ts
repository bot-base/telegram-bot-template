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
      // Give every user their one personal session storage per bot
      // (an independent session for the same user in each bot)
      return ctx.from === undefined || ctx.me === undefined
        ? undefined
        : `${ctx.from.id}/${ctx.me.id}`;
    },
  });
