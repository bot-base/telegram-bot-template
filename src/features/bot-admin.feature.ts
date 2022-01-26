import { Composer } from "grammy";
import { isPrivate, isUserId } from "grammy-guard";

import { Context } from "@bot/types";
import { usersService } from "@bot/services";
import { logger } from "@bot/logger";
import { config } from "@bot/config";
import {
  DEFAULT_LANGUAGE_CODE,
  getGroupChatCommands,
  getPrivateChatCommands,
} from "@bot/helpers/bot-commands";
import { isMultipleLocales, locales } from "@bot/helpers/i18n";
import { getMetadata } from "@bot/helpers/logging";

export const composer = new Composer<Context>();

const filteredComposer = composer
  .filter(isPrivate)
  .filter(isUserId(config.BOT_ADMIN_USER_ID));

filteredComposer.command("stats", async (ctx) => {
  logger.info({ msg: "handle stats", ...getMetadata(ctx) });

  await ctx.replyWithChatAction("typing");

  const totalUsersCount = await usersService.getTotalCount();

  const stats = `Users count: ${totalUsersCount}`;

  return ctx.reply(stats);
});

filteredComposer.command("setcommands", async (ctx) => {
  logger.info({ msg: "handle setcommands", ...getMetadata(ctx) });

  await ctx.replyWithChatAction("typing");

  // set private chat commands
  await ctx.api.setMyCommands(
    getPrivateChatCommands({
      localeCode: DEFAULT_LANGUAGE_CODE,
      includeLanguageCommand: isMultipleLocales,
    }),
    {
      scope: {
        type: "all_private_chats",
      },
    }
  );

  if (isMultipleLocales) {
    const requests = locales.map((code) =>
      ctx.api.setMyCommands(
        getPrivateChatCommands({
          localeCode: code,
          includeLanguageCommand: isMultipleLocales,
        }),
        {
          language_code: code,
          scope: {
            type: "all_private_chats",
          },
        }
      )
    );

    await Promise.all(requests);
  }

  // set private chat admin commands
  await ctx.api.setMyCommands(
    [
      ...getPrivateChatCommands({
        localeCode: DEFAULT_LANGUAGE_CODE,
        includeLanguageCommand: isMultipleLocales,
      }),
      {
        command: "stats",
        description: "Stats",
      },
      {
        command: "setcommands",
        description: "Set bot commands",
      },
    ],
    {
      scope: {
        type: "chat",
        chat_id: config.BOT_ADMIN_USER_ID,
      },
    }
  );

  // set group chat commands
  await ctx.api.setMyCommands(
    getGroupChatCommands({
      localeCode: DEFAULT_LANGUAGE_CODE,
    }),
    {
      scope: {
        type: "all_group_chats",
      },
    }
  );

  return ctx.reply("Commands updated");
});
