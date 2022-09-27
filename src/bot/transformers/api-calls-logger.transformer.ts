import { Transformer } from "grammy";

import { logger } from "~/logger";

export const transformer: Transformer = (prev, method, payload, signal) => {
  logger.debug({
    msg: "bot api call",
    method,
    payload,
  });

  return prev(method, payload, signal);
};
