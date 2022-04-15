import { bot } from "@bot/bot";
import { logger } from "@bot/logger";
import { server } from "@bot/server";

export const handleGracefulShutdown = async () => {
  logger.info("shutdown");

  await bot.stop();
  await server.close();
};
