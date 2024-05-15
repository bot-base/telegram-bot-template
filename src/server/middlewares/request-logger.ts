import { MiddlewareHandler } from "hono";
import { getPath } from "hono/utils/url";
import { logger } from "#root/logger.js";
import { randomUUID } from "node:crypto";

export function requestLogger(): MiddlewareHandler {
  return async (c, next) => {
    const { method } = c.req;
    const path = getPath(c.req.raw);
    const requestId = randomUUID();

    logger.debug({
      msg: "Incoming request",
      requestId,
      method,
      path,
    });
    const startTime = performance.now();

    await next();

    const endTime = performance.now();
    logger.debug({
      msg: "Request completed",
      requestId,
      method,
      path,
      status: c.res.status,
      elapsed: endTime - startTime,
    });
  };
}
