import ISO6391 from "iso-639-1";
import { Composer } from "grammy";
import { Menu } from "@grammyjs/menu";

import { Context } from "@bot/types";
import { isPrivateChat } from "@bot/helpers/filters";
import { logger } from "@bot/logger";
import { locales } from "@bot/helpers/i18n";
import { usersService } from "@bot/services";

const baseComposer = new Composer<Context>();

export const composer = baseComposer.filter(isPrivateChat);

const menu = new Menu<Context>("language");

for (let index = 1; index <= locales.length; index += 1) {
  const code = locales[index - 1];

  menu.text(
    {
      text: (ctx) => {
        const isActivated =
          (ctx.session.user.languageCode || ctx.from?.language_code) === code;

        return `${isActivated ? "✅ " : ""}${ISO6391.getNativeName(code)}`;
      },
      payload: code,
    },
    async (ctx) => {
      const newLanguageCode = ctx.match;

      await ctx.answerCallbackQuery();

      if (locales.includes(newLanguageCode)) {
        await usersService.updateByTelegramId(ctx.from.id, {
          languageCode: newLanguageCode,
        });
        ctx.session.user.languageCode = newLanguageCode;

        await ctx.fluent.renegotiateLocale();

        await ctx.editMessageText(ctx.t("language_changed"), {
          reply_markup: menu,
        });
      }
    }
  );

  if (index % 2 === 0) {
    menu.row();
  }
}

composer.use(menu);

composer.command("language", async (ctx) => {
  logger.info({ msg: "handle language", from: ctx.from, chat: ctx.chat });

  await ctx.replyWithChatAction("typing");
  await ctx.reply(ctx.t("language_pick"), { reply_markup: menu });
});
