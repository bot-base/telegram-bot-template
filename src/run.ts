import "module-alias/register";

import { bot } from "@bot/bot";
import { server } from "@bot/server";
import { prisma } from "@bot/prisma";
import { config } from "@bot/config";
import { logger } from "@bot/logger";
import { loadLocales } from "@bot/helpers/i18n";
import { handleGracefulShutdown } from "@bot/helpers/graceful-shutdown-handler";

// Graceful shutdown
prisma.$on("beforeExit", handleGracefulShutdown);

const run = async () => {
  await loadLocales();

  if (config.isProd) {
    server.listen(config.BOT_SERVER_PORT, config.BOT_SERVER_HOST, () => {
      bot.api
        .setWebhook(config.BOT_WEBHOOK, {
          allowed_updates: config.BOT_ALLOWED_UPDATES,
        })
        .catch((err) => logger.error(err));
    });
  } else {
    bot.start({
      allowed_updates: config.BOT_ALLOWED_UPDATES,
      onStart: ({ username }) =>
        logger.info({
          msg: "bot running...",
          username,
        }),
    });
  }
};
run();
