import fastify from "fastify";
import { BotError, webhookCallback } from "grammy";
import { register } from "prom-client";
import type { Bot } from "~/bot";
import { errorHandler } from "~/bot/handlers";
import type { Container } from "~/container";

export const createServer = async (
  {
    getBot,
  }: {
    getBot: (token: string) => Promise<Bot>;
  },
  container: Container
) => {
  const { logger, prisma } = container;

  const server = fastify({
    logger,
  });

  server.setErrorHandler(async (error, req, res) => {
    if (error instanceof BotError) {
      errorHandler(error);

      await res.code(200).send({});
    } else {
      logger.error(error);

      await res.status(500).send({ error: "Oops! something went wrong." });
    }
  });

  server.post("/:token([0-9]+:[a-zA-Z0-9_-]+)", async (req, res) => {
    const { token } = req.params as { token: string };

    return webhookCallback(await getBot(token), "fastify")(req, res);
  });

  server.get(`/metrics`, async (req, res) => {
    try {
      const appMetrics = await register.metrics();
      const prismaMetrics = await prisma.$metrics.prometheus();
      const metrics = appMetrics + prismaMetrics;

      await res.header("Content-Type", register.contentType).send(metrics);
    } catch (err) {
      await res.status(500).send(err);
    }
  });

  return server;
};
