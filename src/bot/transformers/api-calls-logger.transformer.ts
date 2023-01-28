import { Transformer } from "grammy";

import { Logger } from "~/logger";

export const apiCallsLogger =
  (logger: Logger): Transformer =>
  (prev, method, payload, signal) => {
    logger.debug({
      msg: "bot api call",
      method,
      payload,
    });

    return prev(method, payload, signal);
  };
