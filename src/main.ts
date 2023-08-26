#!/usr/bin/env tsx

import { serve } from "@hono/node-server";
import { Bot, createBot } from "#root/bot/index.js";
import { config } from "#root/config.js";
import { logger } from "#root/logger.js";
import { createServer } from "#root/server/index.js";
import { AddressInfo } from "node:net";

function onShutdown(cleanUp: () => Promise<void>) {
  let isShuttingDown = false;
  const handleShutdown = async () => {
    if (isShuttingDown) return;
    isShuttingDown = true;
    logger.info("Shutdown");
    await cleanUp();
  };
  process.on("SIGINT", handleShutdown);
  process.on("SIGTERM", handleShutdown);
}

try {
  const bots = new Map<string, Bot>();
  const server = await createServer({
    getBot: async (token) => {
      if (bots.has(token)) {
        return bots.get(token) as Bot;
      }

      const bot = createBot(token);
      await bot.init();

      bots.set(token, bot);

      return bot;
    },
  });

  let serverHandle: undefined | ReturnType<typeof serve>;
  const startServer = () =>
    new Promise<AddressInfo>((resolve) => {
      serverHandle = serve(
        {
          fetch: server.fetch,
          hostname: config.BOT_SERVER_HOST,
          port: config.BOT_SERVER_PORT,
        },
        (info) => resolve(info),
      );
    });
  const stopServer = async () =>
    new Promise<void>((resolve) => {
      if (serverHandle) {
        serverHandle.close(() => resolve());
      } else {
        resolve();
      }
    });

  // graceful shutdown
  onShutdown(async () => {
    await stopServer();
  });

  // start server
  const info = await startServer();
  logger.info({
    msg: "Server started",
    url:
      info.family === "IPv6"
        ? `http://[${info.address}]:${info.port}`
        : `http://${info.address}:${info.port}`,
  });
} catch (error) {
  logger.error(error);
  process.exit(1);
}
