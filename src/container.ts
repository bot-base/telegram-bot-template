import { createContainer } from "@deptyped/iti";
import Redis from "ioredis";
import { RedisAdapter } from "@grammyjs/storage-redis";
import { config } from "~/config";
import { createLogger } from "~/logger";
import { createPrisma } from "~/prisma";
import { UserService } from "~/services";

export const createAppContainer = () =>
  createContainer()
    .add({
      config: () => config,
    })
    .add((items) => ({
      logger: () => createLogger(items.config),
    }))
    .add((items) => ({
      prisma: () => createPrisma(items.logger),
      botSessionStorage: () =>
        new RedisAdapter({
          instance: new Redis(items.config.REDIS_URL),
        }),
    }))
    .add(({ prisma, logger }) => ({
      userService: () =>
        new UserService({
          prisma,
          logger,
        }),
    }));

export type Container = ReturnType<typeof createAppContainer>;

export const container = createAppContainer();
