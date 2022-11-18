import { I18n, I18nFlavor } from "@grammyjs/i18n";
import { Context } from "~/bot/types";

export const match = (key: string) => (ctx: Context & I18nFlavor) =>
  ctx.message?.text === ctx.t(key);

export const i18n = new I18n<Context>({
  defaultLocale: "en",
  directory: "locales",
  useSession: true,
  fluentBundleOptions: {
    useIsolating: false,
  },
});

export const isMultipleLocales = i18n.locales.length > 1;
