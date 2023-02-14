import { autoChatAction } from "@grammyjs/auto-chat-action";
import { hydrate } from "@grammyjs/hydrate";
import { hydrateReply, parseMode } from "@grammyjs/parse-mode";
import { Bot as TelegramBot } from "grammy";
import { createContextConstructor } from "~/bot/context";
import {
  botAdminFeature,
  languageFeature,
  welcomeFeature,
} from "~/bot/features";
import { errorHandler, unhandledHandler } from "~/bot/handlers";
import { isMultipleLocales } from "~/bot/i18n";
import {
  i18n,
  metrics,
  session,
  setScope,
  updateLogger,
} from "~/bot/middlewares";
import { apiCallsLogger } from "~/bot/transformers";
import { Container } from "~/container";

export const createBot = (token: string, container: Container) => {
  const { config, logger, botSessionStorage } = container.items;

  const bot = new TelegramBot(token, {
    ContextConstructor: createContextConstructor(container),
  });

  // Middlewares

  bot.api.config.use(parseMode("HTML"));

  if (config.isDev) {
    bot.api.config.use(apiCallsLogger(logger));
    bot.use(updateLogger());
  }

  bot.use(metrics());
  bot.use(autoChatAction());
  bot.use(hydrateReply);
  bot.use(hydrate());
  bot.use(session(botSessionStorage));
  bot.use(setScope());
  bot.use(i18n());

  // Handlers

  bot.use(botAdminFeature);
  bot.use(welcomeFeature);

  if (isMultipleLocales) {
    bot.use(languageFeature);
  }

  bot.use(unhandledHandler);

  if (config.isDev) {
    bot.catch(errorHandler);
  }

  return bot;
};

export type Bot = ReturnType<typeof createBot>;
