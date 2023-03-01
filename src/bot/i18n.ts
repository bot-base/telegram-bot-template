import { I18n } from "@grammyjs/i18n";
import type { Context } from "~/bot/context";

export const i18n = new I18n<Context>({
  defaultLocale: "en",
  directory: "locales",
  fluentBundleOptions: {
    useIsolating: false,
  },
  localeNegotiator: (ctx) => ctx.scope.user?.languageCode ?? undefined,
});

export const isMultipleLocales = i18n.locales.length > 1;
