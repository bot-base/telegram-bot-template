import Redis from "ioredis";

import { config } from "@bot/config";

export const connection = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
});
