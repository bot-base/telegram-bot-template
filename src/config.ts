import "dotenv/config";
import z, { ZodError, ZodIssueCode } from "zod";
import { API_CONSTANTS } from "grammy";

function parseJsonSafe(path: string) {
  return (value: unknown) => {
    try {
      return JSON.parse(String(value));
    } catch {
      throw new ZodError([
        {
          code: ZodIssueCode.custom,
          path: [path],
          fatal: true,
          message: "Invalid JSON",
        },
      ]);
    }
  };
}

const configSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]),
  LOG_LEVEL: z
    .enum(["trace", "debug", "info", "warn", "error", "fatal", "silent"])
    .default("info"),
  BOT_SERVER_HOST: z.string().default("0.0.0.0"),
  BOT_SERVER_PORT: z.coerce.number().positive().default(80),
  BOT_ALLOWED_UPDATES: z
    .preprocess(
      parseJsonSafe("BOT_ALLOWED_UPDATES"),
      z.array(z.enum(API_CONSTANTS.ALL_UPDATE_TYPES)),
    )
    .default([]),
  BOT_TOKEN: z.string(),
  BOT_WEBHOOK: z.string().url(),
  BOT_ADMIN_USER_ID: z
    .preprocess(
      parseJsonSafe("BOT_ADMIN_USER_ID"),
      z.array(z.coerce.number().safe()).or(z.coerce.number().safe()),
    )
    .transform((v) => (Array.isArray(v) ? v : [v]))
    .default([]),
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
