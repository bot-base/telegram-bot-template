import { Bot, GrammyError, HttpError } from "grammy";
import { limit as rateLimit } from "@grammyjs/ratelimiter";
import { apiThrottler } from "@grammyjs/transformer-throttler";

import { Context } from "@bot/types";
import { config } from "@bot/config";
import {
  updatesLogger,
  setupSession,
  setupContext,
  setupLogger,
  registerUser,
  setupI18n,
  collectMetrics,
} from "@bot/middlewares";
import {
  botAdminFeature,
  languagePickFeature,
  welcomeFeature,
} from "@bot/features";
import { isMultipleLocales } from "@bot/helpers/i18n";

export const bot = new Bot<Context>(config.BOT_TOKEN);

// Middlewares

bot.api.config.use(apiThrottler());

if (config.isDev) {
  bot.use(updatesLogger());
}

bot.use(collectMetrics());
bot.use(rateLimit());
bot.use(setupSession());
bot.use(setupContext());
bot.use(setupLogger());
bot.use(setupI18n());
bot.use(registerUser());

// Handlers

bot.use(botAdminFeature);
bot.use(welcomeFeature);

if (isMultipleLocales) {
  bot.use(languagePickFeature);
}

if (config.isDev) {
  /* eslint-disable no-console */

  bot.catch((err) => {
    const { ctx } = err;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });
}
