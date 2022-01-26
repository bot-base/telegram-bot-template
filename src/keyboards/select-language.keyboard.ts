import ISO6391 from "iso-639-1";
import { Menu } from "@grammyjs/menu";

import { Context } from "@bot/types";
import { locales } from "@bot/helpers/i18n";
import { usersService } from "@bot/services";

export const keyboard = new Menu<Context>("language");

for (let index = 1; index <= locales.length; index += 1) {
  const code = locales[index - 1];

  keyboard.text(
    {
      text: (ctx) => {
        const isActivated =
          (ctx.session?.languageCode || ctx.from?.language_code) === code;

        return `${isActivated ? "✅ " : ""}${ISO6391.getNativeName(code)}`;
      },
      payload: code,
    },
    async (ctx) => {
      const newLanguageCode = ctx.match;

      if (locales.includes(newLanguageCode)) {
        await usersService.updateByTelegramId(ctx.from.id, {
          languageCode: newLanguageCode,
        });
        ctx.session.languageCode = newLanguageCode;

        await ctx.fluent.renegotiateLocale();

        await ctx.editMessageText(ctx.t("language_changed"), {
          reply_markup: keyboard,
        });
      }
    }
  );

  if (index % 2 === 0) {
    keyboard.row();
  }
}
