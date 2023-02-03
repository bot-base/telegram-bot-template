#!/usr/bin/env tsx
import { createBot } from "~/bot";
import { container as appContainer, Container } from "~/container";
import { createServer } from "~/server";

async function main(container: Container) {
  const { config, logger, prisma } = container.items;

  const bot = createBot(config.BOT_TOKEN, container);
  await bot.init();

  const server = await createServer(bot, container);

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

main(appContainer).catch((err) => {
  appContainer.get("logger").error(err);
  process.exit(1);
});
