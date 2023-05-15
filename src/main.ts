#!/usr/bin/env tsx
import { RedisAdapter } from "@grammyjs/storage-redis";
import { Role } from "@prisma/client";
import { createBot } from "~/bot";
import { createAppContainer } from "~/container";
import { createServer } from "~/server";

const container = createAppContainer();

try {
  const { config, logger, prisma, redis } = container;
  const bot = createBot(config.BOT_TOKEN, {
    container,
    sessionStorage: new RedisAdapter({
      instance: redis,
    }),
  });
  await bot.init();

  const server = await createServer(bot, container);

  // Graceful shutdown
  prisma.$on("beforeExit", async () => {
    logger.info("shutdown");

    await bot.stop();
    await server.close();
  });

  await prisma.$connect();

  // update bot owner role
  await prisma.user.upsert({
    where: prisma.user.byTelegramId(config.BOT_ADMIN_USER_ID),
    create: {
      telegramId: config.BOT_ADMIN_USER_ID,
      role: Role.OWNER,
    },
    update: {
      role: Role.OWNER,
    },
  });

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
} catch (err) {
  container.logger.error(err);
  process.exit(1);
}
