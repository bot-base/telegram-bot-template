import "module-alias/register";

import { bot } from "~/bot";
import { server } from "~/server";
import { prisma } from "~/prisma";
import { config } from "~/config";
import { logger } from "~/logger";

// Graceful shutdown
prisma.$on("beforeExit", async () => {
  logger.info("shutdown");

  await bot.stop();
  await server.close();
});

server.listen(
  {
    host: config.BOT_SERVER_HOST,
    port: config.BOT_SERVER_PORT,
  },
  (serverError) => {
    if (serverError) {
      logger.error(serverError);
    } else if (config.isProd) {
      bot.api
        .setWebhook(config.BOT_WEBHOOK, {
          allowed_updates: config.BOT_ALLOWED_UPDATES,
        })
        .catch((err) => logger.error(err));
    } else if (config.isDev) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      bot.start({
        allowed_updates: config.BOT_ALLOWED_UPDATES,
        onStart: ({ username }) =>
          logger.info({
            msg: "bot running...",
            username,
          }),
      });
    }
  }
);
