import { bot } from "@bot/bot";
import { logger } from "@bot/logger";

export const handleGracefulShutdown = async () => {
  logger.info("shutdown");

  await bot.stop();

  process.exit();
};
