import type { BotCommand } from '@grammyjs/types'
import type { CommandContext } from 'grammy'
import { i18n, isMultipleLocales } from '#root/bot/i18n.js'
import { config } from '#root/config.js'
import type { Context } from '#root/bot/context.js'

function getLanguageCommand(localeCode: string): BotCommand {
  return {
    command: 'language',
    description: i18n.t(localeCode, 'language_command.description'),
  }
}

function getPrivateChatCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: 'start',
      description: i18n.t(localeCode, 'start_command.description'),
    },
  ]
}

function getPrivateChatAdminCommands(localeCode: string): BotCommand[] {
  return [
    {
      command: 'setcommands',
      description: i18n.t(localeCode, 'setcommands_command.description'),
    },
  ]
}

function getGroupChatCommands(_localeCode: string): BotCommand[] {
  return []
}

export async function setCommandsHandler(ctx: CommandContext<Context>) {
  const DEFAULT_LANGUAGE_CODE = 'en'

  // set private chat commands
  await ctx.api.setMyCommands(
    [
      ...getPrivateChatCommands(DEFAULT_LANGUAGE_CODE),
      ...(isMultipleLocales ? [getLanguageCommand(DEFAULT_LANGUAGE_CODE)] : []),
    ],
    {
      scope: {
        type: 'all_private_chats',
      },
    },
  )

  if (isMultipleLocales) {
    const requests = i18n.locales.map(code =>
      ctx.api.setMyCommands(
        [
          ...getPrivateChatCommands(code),
          ...(isMultipleLocales
            ? [getLanguageCommand(DEFAULT_LANGUAGE_CODE)]
            : []),
        ],
        {
          language_code: code,
          scope: {
            type: 'all_private_chats',
          },
        },
      ),
    )

    await Promise.all(requests)
  }

  // set group chat commands
  await ctx.api.setMyCommands(getGroupChatCommands(DEFAULT_LANGUAGE_CODE), {
    scope: {
      type: 'all_group_chats',
    },
  })

  if (isMultipleLocales) {
    const requests = i18n.locales.map(code =>
      ctx.api.setMyCommands(getGroupChatCommands(code), {
        language_code: code,
        scope: {
          type: 'all_group_chats',
        },
      }),
    )

    await Promise.all(requests)
  }

  // set private chat commands for owner
  await ctx.api.setMyCommands(
    [
      ...getPrivateChatCommands(DEFAULT_LANGUAGE_CODE),
      ...getPrivateChatAdminCommands(DEFAULT_LANGUAGE_CODE),
      ...(isMultipleLocales ? [getLanguageCommand(DEFAULT_LANGUAGE_CODE)] : []),
    ],
    {
      scope: {
        type: 'chat',
        chat_id: Number(config.BOT_ADMINS),
      },
    },
  )

  return ctx.reply(ctx.t('admin.commands-updated'))
}
