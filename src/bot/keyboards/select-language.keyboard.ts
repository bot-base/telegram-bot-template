import ISO6391, { LanguageCode } from "iso-639-1";
import { Menu } from "@grammyjs/menu";

import { Context } from "~/bot/types";
import { usersService } from "~/services";
import { i18n } from "~/bot/helpers/i18n";
import { logHandle } from "~/bot/helpers/logging";

export const keyboard = new Menu<Context>("language");

for (let index = 1; index <= i18n.locales.length; index += 1) {
  const code = i18n.locales[index - 1] as LanguageCode;

  keyboard.text(
    {
      text: async (ctx) => {
        const isActivated = (await ctx.i18n.getLocale()) === code;

        return `${isActivated ? "✅ " : ""}${ISO6391.getNativeName(code)}`;
      },
      payload: code,
    },
    logHandle("handle language selection"),
    async (ctx) => {
      const newLanguageCode = ctx.match;

      if (i18n.locales.includes(newLanguageCode)) {
        await usersService.updateByTelegramId(ctx.from.id, {
          data: {
            languageCode: newLanguageCode,
          },
        });
        await ctx.i18n.setLocale(newLanguageCode);

        await ctx.editMessageText(ctx.t("language.changed"), {
          reply_markup: keyboard,
        });
      }
    }
  );

  if (index % 2 === 0) {
    keyboard.row();
  }
}
