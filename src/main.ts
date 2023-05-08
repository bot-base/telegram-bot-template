#!/usr/bin/env tsx
import { RedisAdapter } from "@grammyjs/storage-redis";
import { Role } from "@prisma/client";
import { Bot, createBot } from "~/bot";
import { createAppContainer } from "~/container";
import { createServer } from "~/server";

const container = createAppContainer();

try {
  const { config, logger, prisma, redis } = container;

  const bots = new Map<string, Bot>();
  const server = await createServer(
    {
      getBot: async (token) => {
        if (bots.has(token)) {
          return bots.get(token) as Bot;
        }

        const bot = createBot(token, {
          container,
          sessionStorage: new RedisAdapter({
            instance: redis,
          }),
        });
        await bot.init();

        bots.set(token, bot);

        return bot;
      },
    },
    container
  );

  // Graceful shutdown
  prisma.$on("beforeExit", async () => {
    logger.info("shutdown");

    await Promise.all(Object.values(bots).map((bot: Bot) => bot.stop()));
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

  await server.listen({
    host: config.BOT_SERVER_HOST,
    port: config.BOT_SERVER_PORT,
  });
} catch (err) {
  container.logger.error(err);
  process.exit(1);
}
