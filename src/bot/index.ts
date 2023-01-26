import { Bot as TelegramBot } from "grammy";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { hydrate } from "@grammyjs/hydrate";

import { Context } from "~/bot/types";
import { config } from "~/config";

import {
  updateLogger,
  session,
  setLocals,
  i18n,
  metrics,
} from "~/bot/middlewares";
import { apiCallsLogger } from "~/bot/transformers";
import {
  botAdminFeature,
  languageSelectFeature,
  welcomeFeature,
} from "~/bot/features";
import { isMultipleLocales } from "~/bot/i18n";
import { handleError } from "~/bot/helpers/error-handler";

export const createBot = (token: string) => {
  const bot = new TelegramBot<Context>(token);

  // Middlewares

  bot.api.config.use(parseMode("HTML"));

  if (config.isDev) {
    bot.api.config.use(apiCallsLogger);
    bot.use(updateLogger());
  }

  bot.use(metrics());
  bot.use(hydrateReply);
  bot.use(hydrate());
  bot.use(session());
  bot.use(setLocals());
  bot.use(i18n());

  // Handlers

  bot.use(botAdminFeature);
  bot.use(welcomeFeature);

  if (isMultipleLocales) {
    bot.use(languageSelectFeature);
  }

  if (config.isDev) {
    bot.catch(handleError);
  }

  return bot;
};

export type Bot = ReturnType<typeof createBot>;
