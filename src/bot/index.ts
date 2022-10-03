import { Bot } from "grammy";
import { limit as rateLimit } from "@grammyjs/ratelimiter";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { hydrate } from "@grammyjs/hydrate";

import { Context } from "~/bot/types";
import { config } from "~/config";

import {
  updatesLogger,
  setupSession,
  setupLocalContext,
  setupLogger,
  setUser,
  setupI18n,
  collectMetrics,
} from "~/bot/middlewares";
import { apiCallsLogger } from "~/bot/transformers";
import {
  botAdminFeature,
  languageSelectFeature,
  welcomeFeature,
} from "~/bot/features";
import { isMultipleLocales } from "~/bot/helpers/i18n";
import { handleError } from "~/bot/helpers/error-handler";

export const bot = new Bot<Context>(config.BOT_TOKEN);

// Middlewares

bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode("HTML"));

if (config.isDev) {
  bot.api.config.use(apiCallsLogger);
  bot.use(updatesLogger());
}

bot.use(collectMetrics());
bot.use(rateLimit());
bot.use(hydrateReply);
bot.use(hydrate());
bot.use(setupSession());
bot.use(setupLocalContext());
bot.use(setupLogger());
bot.use(setupI18n());
bot.use(setUser());

// Handlers

bot.use(botAdminFeature);
bot.use(welcomeFeature);

if (isMultipleLocales) {
  bot.use(languageSelectFeature);
}

if (config.isDev) {
  bot.catch(handleError);
}
