import type { Context } from "#root/bot/context.js";
import { i18n, isMultipleLocales } from "#root/bot/i18n.js";
import type { BotCommand, LanguageCode } from "@grammyjs/types";
import type { CommandContext } from "grammy";
import { commands, languageCommand, type Command } from "./command-definitions.js";

type CommandScope = {
  type: "all_private_chats" | "all_group_chats";
} | {
  type: "chat";
  chat_id: number;
};

type SetCommandsOptions = {
  language_code?: LanguageCode;
  scope: CommandScope;
};

const filterCommands = (commands: Command[], { isAdminOnly = false, scope }: { isAdminOnly?: boolean; scope?: Command["scope"] }) =>
  commands.filter(cmd => {
    if (scope && cmd.scope !== scope) return false;
    return isAdminOnly ? cmd.isAdmin : !cmd.isAdmin;
  });

const formatBotCommand = (command: Command, localeCode: string): BotCommand => ({
  command: command.command,
  description: command.description(localeCode),
});

const formatLanguageCommand = (localeCode: string): BotCommand => ({
  command: languageCommand.command,
  description: languageCommand.description(localeCode),
});

const setCommandsForScope = async (
  ctx: CommandContext<Context>,
  localeCode: string,
  filteredCommands: Command[],
  options: SetCommandsOptions,
) => {
  const botCommands = [
    ...filteredCommands.map(cmd => formatBotCommand(cmd, localeCode)),
    ...(isMultipleLocales ? [formatLanguageCommand(localeCode)] : []),
  ];
  
  await ctx.api.setMyCommands(botCommands, options);
};

const setCommandsForAllLocales = async (
  ctx: CommandContext<Context>,
  filteredCommands: Command[],
  options: Omit<SetCommandsOptions, "language_code">,
) => {
  if (!isMultipleLocales) return;

  const requests = i18n.locales.map(code =>
    setCommandsForScope(ctx, code, filteredCommands, {
      ...options,
      language_code: code as LanguageCode,
    }),
  );

  await Promise.all(requests);
};

export async function setCommandsHandler(ctx: CommandContext<Context>) {
  const defaultLocale = (await ctx.i18n.getLocale()) || "en";
  
  // Set commands for private chats
  const privateCommands = filterCommands(commands, { scope: "private" });
  await setCommandsForScope(ctx, defaultLocale, privateCommands, {
    scope: { type: "all_private_chats" },
  });
  await setCommandsForAllLocales(ctx, privateCommands, {
    scope: { type: "all_private_chats" },
  });

  // Set commands for group chats
  const groupCommands = filterCommands(commands, { scope: "group" });
  await setCommandsForScope(ctx, defaultLocale, groupCommands, {
    scope: { type: "all_group_chats" },
  });
  await setCommandsForAllLocales(ctx, groupCommands, {
    scope: { type: "all_group_chats" },
  });

  // Set admin commands
  const adminCommands = [...privateCommands, ...filterCommands(commands, { isAdminOnly: true, scope: "private" })];
  await setCommandsForScope(ctx, defaultLocale, adminCommands, {
    scope: { type: "chat", chat_id: Number(ctx.config.botAdmins) },
  });

  return ctx.reply(ctx.t("admin-commands-updated"));
}
