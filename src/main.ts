#!/usr/bin/env tsx
import { RedisAdapter } from "@grammyjs/storage-redis";
import { Role } from "@prisma/client";
import Redis from "ioredis";
import { createBot } from "~/bot";
import { container } from "~/container";
import { createServer } from "~/server";

async function main() {
  const { config, logger, prisma } = container.items;
  const bot = createBot(config.BOT_TOKEN, {
    container,
    sessionStorage: new RedisAdapter({
      instance: new Redis(config.REDIS_URL),
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
}

main().catch((err) => {
  container.items.logger.error(err);
  process.exit(1);
});
