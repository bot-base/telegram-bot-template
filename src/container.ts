import Redis from "ioredis";
import { config } from "~/config";
import { createLogger } from "~/logger";
import { createPrisma } from "~/prisma";

export const createAppContainer = () => {
  const logger = createLogger(config);
  const prisma = createPrisma(logger);
  const redis = new Redis(config.REDIS_URL);

  return {
    config,
    logger,
    prisma,
    redis,
  };
};

export type Container = ReturnType<typeof createAppContainer>;
