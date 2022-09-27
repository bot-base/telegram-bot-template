import fs from "fs";
import { join, resolve } from "path";
import { Fluent } from "@moebius/fluent";
import { Context } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";

const appRoot = join(resolve(__dirname), "..", "..", "..");
const appLocales = join(appRoot, "locales");

export const fluent = new Fluent();
export const locales = fs
  .readdirSync(appLocales)
  .map((localeFilename) =>
    localeFilename.substring(0, localeFilename.indexOf(".ftl"))
  );
export const isMultipleLocales = locales.length > 1;

export const match = (key: string) => (ctx: Context & FluentContextFlavor) =>
  ctx.message?.text === ctx.t(key);

export const loadLocales = async () => {
  const results = locales.map((localeCode) => {
    return fluent.addTranslation({
      locales: localeCode,
      filePath: join(appLocales, `${localeCode}.ftl`),
      bundleOptions: {
        useIsolating: false,
      },
    });
  });

  await Promise.all(results);
};
