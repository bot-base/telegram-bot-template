import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";
import { register } from "prom-client";
import type { Bot } from "~/bot";
import { errorHandler } from "~/bot/handlers";
import type { Container } from "~/container";

export const createServer = async (bot: Bot, container: Container) => {
  const { logger, prisma } = container;

  const server = fastify({
    logger,
  });

  server.setErrorHandler(async (error, request, response) => {
    if (error instanceof BotError) {
      errorHandler(error);

      await response.code(200).send({});
    } else {
      logger.error(error);

      await response.status(500).send({ error: "Oops! Something went wrong." });
    }
  });

  server.post(`/${bot.token}`, webhookCallback(bot, "fastify"));

  server.get(`/${bot.token}/metrics`, async (request, response) => {
    try {
      const appMetrics = await register.metrics();
      const prismaMetrics = await prisma.raw.$metrics.prometheus();
      const metrics = appMetrics + prismaMetrics;

      await response.header("Content-Type", register.contentType).send(metrics);
    } catch (error) {
      await response.status(500).send(error);
    }
  });

  return server;
};
