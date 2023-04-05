import { config } from "~/config";
import { createLogger } from "~/logger";
import { createPrisma } from "~/prisma";

export const createAppContainer = () => {
  const logger = createLogger(config);
  const prisma = createPrisma(logger);

  return {
    config,
    logger,
    prisma,
  };
};

export type Container = ReturnType<typeof createAppContainer>;
