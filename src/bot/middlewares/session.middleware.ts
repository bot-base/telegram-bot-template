import { Middleware, session as createSession, StorageAdapter } from "grammy";
import type { Context } from "~/bot/context";

export const session = (
  storage: StorageAdapter<unknown>
): Middleware<Context> =>
  createSession({
    initial: () => ({}),
    storage,
  });
