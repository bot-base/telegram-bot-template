import { Middleware, StorageAdapter, session as createSession } from "grammy";
import type { Context } from "~/bot/context";

export const session = (
  storage: StorageAdapter<unknown>
): Middleware<Context> =>
  createSession({
    initial: () => ({}),
    storage,
  });
