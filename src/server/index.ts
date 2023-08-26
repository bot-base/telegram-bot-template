import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { webhookCallback } from "grammy";
import type { Bot } from "#root/bot/index.js";
import { logger } from "#root/logger.js";
import { config } from "#root/config.js";
import { requestLogger } from "#root/server/middlewares/request-logger.js";
import { getPath } from "hono/utils/url";

export const createServer = async ({
  getBot,
}: {
  getBot: (token: string) => Promise<Bot>;
}) => {
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

  server.post("/:token{[0-9]+:[a-zA-Z0-9_-]+}", async (c) => {
    const { token } = c.req.param();

    return webhookCallback(await getBot(token), "hono")(c);
  });

  return server;
};

export type Server = Awaited<ReturnType<typeof createServer>>;
