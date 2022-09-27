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

server.setErrorHandler(async (error, request, response) => {
  if (error instanceof BotError) {
    await handleError(error);

    response.code(200).send({});
  } else {
    logger.error(error);

    response.status(500).send({ error: "Something went wrong" });
  }
});

server.post(`/${config.BOT_TOKEN}`, webhookCallback(bot, "fastify"));

server.get(`/${config.BOT_TOKEN}/metrics`, async (req, res) => {
  try {
    res.header("Content-Type", register.contentType);
    res.send(await register.metrics());
  } catch (err) {
    res.status(500).send(err);
  }
});
