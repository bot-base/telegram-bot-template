import { Bot } from "grammy";
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
