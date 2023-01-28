import { Middleware } from "grammy";
import { i18n as i18nProvider } from "~/bot/i18n";
import { Context } from "~/bot/types";

export const i18n = (): Middleware<Context> => i18nProvider;
