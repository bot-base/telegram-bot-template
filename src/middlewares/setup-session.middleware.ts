import { session } from "grammy";
import { RedisAdapter } from "@grammyjs/storage-redis";

import { connection } from "@bot/redis";

const storage = new RedisAdapter({
  instance: connection,
});

export const middleware = () =>
  session({
    initial: () => ({}),
    storage,
  });
