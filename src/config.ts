import "dotenv/config";
import z from "zod";

const updates = [
  "message",
  "poll",
  "poll_answer",
  "my_chat_member",
  "chat_member",
  "chat_join_request",
  "edited_message",
  "channel_post",
  "edited_channel_post",
  "inline_query",
  "chosen_inline_result",
  "callback_query",
  "shipping_query",
  "pre_checkout_query",
] as const;

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  LOG_LEVEL: z.enum([
    "trace",
    "debug",
    "info",
    "warn",
    "error",
    "fatal",
    "silent",
  ]),
  DATABASE_URL: z.string(),
  REDIS_URL: z.string(),
  BOT_SERVER_HOST: z.string().default("0.0.0.0"),
  BOT_SERVER_PORT: z.coerce.number().positive().default(80),
  BOT_ALLOWED_UPDATES: z.preprocess(
    (v: unknown) => JSON.parse(String(v)),
    z.array(z.enum(updates))
  ),
  BOT_TOKEN: z.string(),
  BOT_WEBHOOK: z.string().url(),
  BOT_ADMIN_USER_ID: z.coerce.number().finite(),
});

export const config = configSchema.parse(process.env);
export const isDev = config.NODE_ENV === "development";
export const isProd = config.NODE_ENV === "production";
export type Config = z.infer<typeof configSchema>;
