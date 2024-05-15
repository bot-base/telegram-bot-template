import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { webhookCallback } from "grammy";
import type { Bot } from "#root/bot/index.js";
import { logger } from "#root/logger.js";
import { config } from "#root/config.js";
import { requestLogger } from "#root/server/middlewares/request-logger.js";
import { getPath } from "hono/utils/url";

export const createServer = async (bot: Bot) => {
  const server = new Hono();

  if (config.isDev) {
    server.use(requestLogger());
  }

  server.onError(async (error, c) => {
    if (error instanceof HTTPException) {
      if (error.status < 500) {
        logger.info(error);
      } else {
        logger.error(error);
      }
      return error.getResponse();
    }

    // unexpected error
    logger.error({
      err: error,
      method: c.req.raw.method,
      path: getPath(c.req.raw),
    });
    return c.json(
      {
        error: "Oops! Something went wrong.",
      },
      500,
    );
  });

  server.get("/", (c) => c.json({ status: true }));

  server.post(
    "/webhook",
    webhookCallback(bot, "hono", {
      secretToken: config.BOT_WEBHOOK_SECRET,
    }),
  );

  return server;
};

export type Server = Awaited<ReturnType<typeof createServer>>;
