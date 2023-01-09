#!/usr/bin/env node

import "module-alias/register";
import { createBot } from "~/bot";
import { createServer } from "~/server";
import { prisma } from "~/prisma";
import { config } from "~/config";
import { logger } from "~/logger";

async function main() {
  const bot = createBot(config.BOT_TOKEN);
  await bot.init();

  const server = await createServer({
    bot,
  });

  // Graceful shutdown
  prisma.$on("beforeExit", async () => {
    logger.info("shutdown");

    await bot.stop();
    await server.close();
  });

  await prisma.$connect();

  if (config.isProd) {
    await server.listen({
      host: config.BOT_SERVER_HOST,
      port: config.BOT_SERVER_PORT,
    });

    await bot.api.setWebhook(config.BOT_WEBHOOK, {
      allowed_updates: config.BOT_ALLOWED_UPDATES,
    });
  } else if (config.isDev) {
    await bot.start({
      allowed_updates: config.BOT_ALLOWED_UPDATES,
      onStart: ({ username }) =>
        logger.info({
          msg: "bot running...",
          username,
        }),
    });
  }
}

main().catch((err) => {
  logger.error(err);
  process.exit(1);
});
