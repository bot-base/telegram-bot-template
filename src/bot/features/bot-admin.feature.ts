import { chatAction } from "@grammyjs/auto-chat-action";
import { Role } from "@prisma/client";
import { Composer, Keyboard } from "grammy";
import { or } from "grammy-guard";
import _ from "lodash";
import type { Context } from "~/bot/context";
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
  chatAction("typing"),
  async (ctx) => {
    const userId = ctx.message.user_shared.user_id;

    let user = await ctx.prisma.user.findUnique({
      where: ctx.prisma.user.byTelegramId(userId),
      select: {
        id: true,
        languageCode: true,
        ...ctx.prisma.user.withRoles(),
      },
    });

    if (user === null) {
      return ctx.reply(ctx.t("admin.user-not-found"));
    }

    user = await ctx.prisma.user.update({
      where: ctx.prisma.user.byTelegramId(userId),
      data: {
        role: user.role === Role.ADMIN ? Role.USER : Role.ADMIN,
      },
      select: {
        id: true,
        languageCode: true,
        ...ctx.prisma.user.withRoles(),
      },
    });

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

    const updateCommandsForUser = user.isAdmin
      ? ctx.api.setMyCommands(
          [
            ...getPrivateChatCommands({
              localeCode: user.languageCode ?? DEFAULT_LANGUAGE_CODE,
              includeLanguageCommand: isMultipleLocales,
            }),
            ...getPrivateChatAdminCommands({
              localeCode: user.languageCode ?? DEFAULT_LANGUAGE_CODE,
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

feature.command(
  "stats",
  logHandle("command-stats"),
  chatAction("typing"),
  async (ctx) => {
    const usersCount = await ctx.prisma.user.count();

    return ctx.reply(`Users count: ${usersCount}`);
  }
);

feature.command(
  "setcommands",
  logHandle("command-setcommands"),
  chatAction("typing"),
  async (ctx) => {
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

    const owner = await ctx.prisma.user.findFirstOrThrow({
      where: ctx.prisma.user.hasOwnerRole(),
      select: {
        telegramId: true,
        languageCode: true,
      },
    });
    const ownerLanguageCode = owner.languageCode ?? DEFAULT_LANGUAGE_CODE;
    // set private chat commands for owner
    await ctx.api.setMyCommands(
      [
        ...getPrivateChatCommands({
          localeCode: ownerLanguageCode,
          includeLanguageCommand: isMultipleLocales,
        }),
        ...getPrivateChatAdminCommands({
          localeCode: ownerLanguageCode,
          includeLanguageCommand: isMultipleLocales,
        }),
        {
          command: "admin",
          description: i18n.t(ownerLanguageCode, "admin_command.description"),
        },
      ],
      {
        scope: {
          type: "chat",
          chat_id: Number(owner.telegramId),
        },
      }
    );

    const adminUsers = await ctx.prisma.user.findMany({
      where: ctx.prisma.user.hasAdminRole(),
      select: {
        telegramId: true,
        languageCode: true,
      },
    });
    if (!_.isEmpty(adminUsers)) {
      const requests = adminUsers.map((admin) =>
        ctx.api.setMyCommands(
          [
            ...getPrivateChatCommands({
              localeCode: admin.languageCode ?? DEFAULT_LANGUAGE_CODE,
              includeLanguageCommand: isMultipleLocales,
            }),
            ...getPrivateChatAdminCommands({
              localeCode: admin.languageCode ?? DEFAULT_LANGUAGE_CODE,
              includeLanguageCommand: isMultipleLocales,
            }),
          ],
          {
            scope: {
              type: "chat",
              chat_id: Number(admin.telegramId),
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
