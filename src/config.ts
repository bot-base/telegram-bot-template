import "dotenv/config";
import { API_CONSTANTS } from "grammy";
import z from "zod";

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
    (v: unknown) => {
      try {
        return JSON.parse(String(v));
      } catch {
        /* empty */
      }
    },
    z.array(z.enum(API_CONSTANTS.ALL_UPDATE_TYPES)),
  ),
  BOT_TOKEN: z.string(),
  BOT_WEBHOOK: z.string().url(),
  BOT_ADMIN_USER_ID: z.coerce.number().finite(),
});

const parseConfig = (environment: NodeJS.ProcessEnv) => {
  const config = configSchema.parse(environment);

  return {
    ...config,
    isDev: process.env.NODE_ENV === "development",
    isProd: process.env.NODE_ENV === "production",
  };
};

export type Config = ReturnType<typeof parseConfig>;

export const config = parseConfig(process.env);
