import _ from "lodash";
import { Composer } from "grammy";
import { or } from "grammy-guard";
import { Role } from "@prisma/client";

import { Context } from "~/bot/types";
import {
  DEFAULT_LANGUAGE_CODE,
  getGroupChatCommands,
  getPrivateChatAdminCommands,
  getPrivateChatCommands,
} from "~/bot/helpers/bot-commands";
import { isMultipleLocales, i18n } from "~/bot/i18n";
import { isOwnerUser, isAdminUser } from "~/bot/filters";
import { logHandle } from "~/bot/helpers/logging";

const composer = new Composer<Context>();

const feature = composer
  .chatType("private")
  .filter(or(isOwnerUser, isAdminUser));

const featureForOwner = composer.chatType("private").filter(isOwnerUser);

featureForOwner.command("admin", logHandle("command-admin"), async (ctx) => {
  const { userService, config } = ctx.container.items;

  if (ctx.match === "") {
    return ctx.reply(
      `Please, pass the Telegram user ID after the command (e.g. <code>/admin ${config.BOT_ADMIN_USER_ID}</code>)`
    );
  }

  const userId = parseInt(ctx.match, 10);

  if (Number.isNaN(userId)) {
    return ctx.reply("Invalid user ID");
  }

  if (userId === config.BOT_ADMIN_USER_ID) {
    return ctx.reply("You're already an administrator");
  }

  let user = await userService.findByTelegramId(userId, {
    select: {
      id: true,
      role: true,
    },
  });

  if (user === null) {
    return ctx.reply("User not found");
  }

  user = await userService.updateByTelegramId(userId, {
    data: {
      role: user.role === Role.ADMIN ? Role.USER : Role.ADMIN,
    },
  });

  const userRoleLabel =
    user.role === Role.ADMIN ? "an administrator" : "a regular user";

  return Promise.all([
    ctx.reply(`User with ID ${user.id} is now ${userRoleLabel}`),
    ctx.api.sendMessage(userId, `You're ${userRoleLabel} now`),
    user.role === Role.ADMIN
      ? ctx.api.setMyCommands(
          [
            ...getPrivateChatCommands({
              localeCode: DEFAULT_LANGUAGE_CODE,
              includeLanguageCommand: isMultipleLocales,
            }),
            ...getPrivateChatAdminCommands({
              localeCode: DEFAULT_LANGUAGE_CODE,
              includeLanguageCommand: isMultipleLocales,
            }),
          ],
          {
            scope: {
              type: "chat",
              chat_id: Number(userId),
            },
          }
        )
      : ctx.api.deleteMyCommands({
          scope: {
            type: "chat",
            chat_id: Number(userId),
          },
        }),
  ]);
});

feature.command("stats", logHandle("command-stats"), async (ctx) => {
  const { userService } = ctx.container.items;

  await ctx.replyWithChatAction("typing");

  const usersCount = await userService.count();

  const stats = `Users count: ${usersCount}`;

  return ctx.reply(stats);
});

feature.command(
  "setcommands",
  logHandle("command-setcommands"),
  async (ctx) => {
    const { userService, config } = ctx.container.items;

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
      const requests = i18n.locales.map((code) =>
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

    // set private chat superadmin commands
    await ctx.api.setMyCommands(
      [
        ...getPrivateChatCommands({
          localeCode: DEFAULT_LANGUAGE_CODE,
          includeLanguageCommand: isMultipleLocales,
        }),
        ...getPrivateChatAdminCommands({
          localeCode: DEFAULT_LANGUAGE_CODE,
          includeLanguageCommand: isMultipleLocales,
        }),
        {
          command: "admin",
          description: "Make user an administrator",
        },
      ],
      {
        scope: {
          type: "chat",
          chat_id: config.BOT_ADMIN_USER_ID,
        },
      }
    );

    const adminUsers = await userService.findMany({
      where: {
        role: Role.ADMIN,
      },
    });

    if (!_.isEmpty(adminUsers)) {
      const requests = adminUsers.map((adminUser) =>
        ctx.api.setMyCommands(
          [
            ...getPrivateChatCommands({
              localeCode: DEFAULT_LANGUAGE_CODE,
              includeLanguageCommand: isMultipleLocales,
            }),
            ...getPrivateChatAdminCommands({
              localeCode: DEFAULT_LANGUAGE_CODE,
              includeLanguageCommand: isMultipleLocales,
            }),
          ],
          {
            scope: {
              type: "chat",
              chat_id: Number(adminUser.telegramId),
            },
          }
        )
      );

      await Promise.all(requests);
    }

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
  }
);

export { composer as botAdminFeature };
