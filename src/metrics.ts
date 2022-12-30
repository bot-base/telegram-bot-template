import prometheus from "prom-client";

prometheus.collectDefaultMetrics();

export const metrics = {
  updateCounter: new prometheus.Counter({
    name: "bot_updates_count",
    help: "Count of updates received",
    labelNames: ["from_id", "chat_id"],
  }),
  updateFailedCounter: new prometheus.Counter({
    name: "bot_updates_failed_count",
    help: "Count of failed updates",
    labelNames: ["from_id", "chat_id"],
  }),
};
