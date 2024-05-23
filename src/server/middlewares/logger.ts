import { logger as _logger } from "#root/logger.js";
import { MiddlewareHandler } from "hono";

export function logger(): MiddlewareHandler {
  return async (c, next) => {
    c.set(
      "logger",
      _logger.child({
        requestId: c.get("requestId"),
      }),
    );

    await next();
  };
}
