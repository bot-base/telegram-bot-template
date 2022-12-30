import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";
import { register } from "prom-client";

import { bot } from "~/bot";
import { config } from "~/config";
import { logger } from "~/logger";
import { handleError } from "~/bot/helpers/error-handler";
import { prisma } from "~/prisma";

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
    const appMetrics = await register.metrics();
    const prismaMetrics = await prisma.$metrics.prometheus();
    const metrics = appMetrics + prismaMetrics;

    await res.header("Content-Type", register.contentType).send(metrics);
  } catch (err) {
    await res.status(500).send(err);
  }
});
