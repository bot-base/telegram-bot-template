import { Middleware } from "grammy";
import type { Context } from "~/bot/context";
import { i18n as i18nProvider } from "~/bot/i18n";

export function i18n(): Middleware<Context> {
  return i18nProvider;
}
