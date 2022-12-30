import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";
import { register } from "prom-client";

import { bot } from "~/bot";
import { config } from "~/config";
import { logger } from "~/logger";
import { handleError } from "~/bot/helpers/error-handler";

export const server = fastify({
  logger,
});

server.setErrorHandler(async (error, req, res) => {
  if (error instanceof BotError) {
    handleError(error);

    await res.code(200).send({});
  } else {
    logger.error(error);

    await res.status(500).send({ error: "Something went wrong" });
  }
});

server.post(`/${config.BOT_TOKEN}`, webhookCallback(bot, "fastify"));

server.get(`/${config.BOT_TOKEN}/metrics`, async (req, res) => {
  try {
    await res
      .header("Content-Type", register.contentType)
      .send(await register.metrics());
  } catch (err) {
    await res.status(500).send(err);
  }
});
