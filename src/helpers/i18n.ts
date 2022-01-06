import fs from "fs";
import { join, resolve } from "path";
import { Fluent } from "@moebius/fluent";

const appDir = join(resolve(__dirname), "..", "..");
const appLocalesPath = join(appDir, "locales");

export const fluent = new Fluent();
export const locales = fs.readdirSync(appLocalesPath);
export const isMultipleLocales = locales.length > 1;

export const loadLocales = async () => {
  const results = locales.map((code) => {
    const localeFiles = fs.readdirSync(join(appLocalesPath, code));
    const filePath = localeFiles.map((path) =>
      join(appLocalesPath, code, path)
    );

    return fluent.addTranslation({
      locales: code,
      filePath,
    });
  });

  await Promise.all(results);
};
