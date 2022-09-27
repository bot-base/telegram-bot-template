import Redis from "ioredis";

import { config } from "~/config";

export const connection = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: null,
});
