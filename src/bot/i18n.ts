import { I18n } from "@grammyjs/i18n";
import { Context } from "~/bot/types";

export const i18n = new I18n<Context>({
  defaultLocale: "en",
  directory: "locales",
  fluentBundleOptions: {
    useIsolating: false,
  },
  localeNegotiator: (ctx) => ctx.local.user?.languageCode ?? undefined,
});

export const isMultipleLocales = i18n.locales.length > 1;
