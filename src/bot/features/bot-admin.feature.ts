import { Role } from "@prisma/client";
import { Composer, Keyboard } from "grammy";
import { or } from "grammy-guard";
import _ from "lodash";
import { isAdminUser, isOwnerUser } from "~/bot/filters";
import {
  DEFAULT_LANGUAGE_CODE,
  getGroupChatCommands,
  getPrivateChatAdminCommands,
  getPrivateChatCommands,
} from "~/bot/helpers/bot-commands";
import { logHandle } from "~/bot/helpers/logging";
import { userRequests } from "~/bot/helpers/user-requests";
import { i18n, isMultipleLocales } from "~/bot/i18n";
import { Context } from "~/bot/types";

const composer = new Composer<Context>();

const feature = composer
  .chatType("private")
  .filter(or(isOwnerUser, isAdminUser));

const featureForOwner = composer.chatType("private").filter(isOwnerUser);

featureForOwner.command("admin", logHandle("command-admin"), (ctx) =>
  ctx.reply(ctx.t("admin.select-user"), {
    reply_markup: {
      resize_keyboard: true,
      keyboard: new Keyboard()
        .requestUser(
          ctx.t("admin.select-user-btn"),
          userRequests.getId("make-admin"),
          {
            user_is_bot: false,
          }
        )
        .build(),
    },
  })
);

featureForOwner.filter(
  userRequests.filter("make-admin"),
  logHandle("user-shared-for-admin-role"),
  async (ctx) => {
    const { userService } = ctx.container.items;
    const userId = ctx.message.user_shared.user_id;

    let user = await userService.findByTelegramId(userId, {
      select: {
        id: true,
        role: true,
      },
    });

    if (user === null) {
      return ctx.reply(ctx.t("admin.user-not-found"));
    }

    user = await userService.updateByTelegramId(
      userId,
      {
        data: {
          role: user.role === Role.ADMIN ? Role.USER : Role.ADMIN,
        },
      },
      {
        select: {
          id: true,
          role: true,
        },
      }
    );

    const notifyOwner = ctx.reply(
      ctx.t("admin.user-role-changed", {
        id: user.id,
        role: user.role,
      }),
      {
        reply_markup: {
          remove_keyboard: true,
        },
      }
    );

    const notifyUser = ctx.api.sendMessage(
      userId,
      ctx.t("admin.your-role-changed", {
        role: user.role,
      })
    );

    const updateCommandsForUser =
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
          });

    return Promise.all([notifyOwner, notifyUser, updateCommandsForUser]);
  }
);

feature.command("stats", logHandle("command-stats"), async (ctx) => {
  const { userService } = ctx.container.items;

  const usersCount = await userService.count();

  const stats = `Users count: ${usersCount}`;

  return ctx.reply(stats);
});

feature.command(
  "setcommands",
  logHandle("command-setcommands"),
  async (ctx) => {
    const { userService, config } = ctx.container.items;

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

    const ownerLocaleCode = await ctx.i18n.getLocale();
    // set private chat commands for owner
    await ctx.api.setMyCommands(
      [
        ...getPrivateChatCommands({
          localeCode: ownerLocaleCode,
          includeLanguageCommand: isMultipleLocales,
        }),
        ...getPrivateChatAdminCommands({
          localeCode: ownerLocaleCode,
          includeLanguageCommand: isMultipleLocales,
        }),
        {
          command: "admin",
          description: ctx.t("admin_command.description"),
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

    return ctx.reply(ctx.t("admin.commands-updated"));
  }
);

export { composer as botAdminFeature };
