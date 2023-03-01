import { Middleware } from "grammy";
import type { Context } from "~/bot/context";
import { i18n as i18nProvider } from "~/bot/i18n";

export const i18n = (): Middleware<Context> => i18nProvider;
