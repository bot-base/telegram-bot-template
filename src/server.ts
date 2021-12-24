import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";

import { bot } from "@bot/bot";
import { config } from "@bot/config";
import { logger } from "@bot/logger";

export const server = fastify({
  logger,
});

server.setErrorHandler(async (error, request, response) => {
  if (error instanceof BotError) {
    const ctx = error.ctx;

    logger.error(error);
  } else {
    request.log.error(error);
  }

  response.code(200).send({});
});

server.post(`/${config.BOT_TOKEN}`, webhookCallback(bot, "fastify"));
