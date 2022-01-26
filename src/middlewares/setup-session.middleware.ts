import { session } from "grammy";
import { RedisAdapter } from "@satont/grammy-redis-storage";
import Redis from "ioredis";

import { config } from "@bot/config";

const storage = new RedisAdapter({
  instance: new Redis(config.REDIS_URL),
});

export const middleware = () =>
  session({
    initial: () => ({}),
    storage,
  });
