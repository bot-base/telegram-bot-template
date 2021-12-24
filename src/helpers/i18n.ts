import fs from "fs";
import { join, resolve } from "path";
import { Fluent } from "@moebius/fluent";

const appDir = join(resolve(__dirname), "..", "..");
const appLocalesPath = join(appDir, "locales");

export const fluent = new Fluent();
export const locales = fs.readdirSync(appLocalesPath);
export const isMultipleLocales = locales.length > 1;

export const loadLocales = async () => {
  for (const localeCode of locales) {
    const localeFiles = fs.readdirSync(join(appLocalesPath, localeCode));
    const filePath = localeFiles.map((filePath) =>
      join(appLocalesPath, localeCode, filePath)
    );

    await fluent.addTranslation({
      locales: localeCode,
      filePath,
    });
  }
};
