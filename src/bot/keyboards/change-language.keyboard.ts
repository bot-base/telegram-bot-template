import { InlineKeyboard } from "grammy";
import ISO6391 from "iso-639-1";
import _ from "lodash";
import { changeLanguageData } from "~/bot/callback-data";
import type { Context } from "~/bot/context";
import { i18n } from "~/bot/i18n";

export const createChangeLanguageKeyboard = async (ctx: Context) => {
  const currentLocaleCode = await ctx.i18n.getLocale();

  const getLabel = (code: string) => {
    const isActive = code === currentLocaleCode;

    return `${isActive ? "✅ " : ""}${ISO6391.getNativeName(code)}`;
  };

  return new InlineKeyboard(
    _.chunk(
      i18n.locales.map((localeCode) => ({
        text: getLabel(localeCode),
        callback_data: changeLanguageData.pack({
          code: localeCode,
        }),
      })),
      2
    )
  );
};
