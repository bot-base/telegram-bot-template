import { createContainer } from "iti";
import { config } from "~/config";
import { createLogger } from "~/logger";
import { createPrisma } from "~/prisma";

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
    }));

export type Container = ReturnType<typeof createAppContainer>;

export const container = createAppContainer();
