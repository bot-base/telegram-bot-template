import { i18n } from "~/bot/helpers/i18n";

export const DEFAULT_LANGUAGE_CODE = "en";

if (!i18n.locales.includes(DEFAULT_LANGUAGE_CODE)) {
  throw new Error(
    `Localization for default language code (${DEFAULT_LANGUAGE_CODE}) is missing`
  );
}

export const getPrivateChatCommands = (options: {
  localeCode: string;
  includeLanguageCommand: boolean;
}) => {
  const commands = [
    {
      command: "start",
      description: i18n.t(options.localeCode, "start_command.description"),
    },
  ];

  if (options.includeLanguageCommand) {
    commands.push({
      command: "language",
      description: i18n.t(options.localeCode, "language_command.description"),
    });
  }

  return commands;
};

export const getPrivateChatAdminCommands = (options: {
  localeCode: string;
  includeLanguageCommand: boolean;
}) => {
  const commands = [
    {
      command: "stats",
      description: "Stats",
    },
    {
      command: "setcommands",
      description: "Set bot commands",
    },
  ];

  return commands;
};

export const getGroupChatCommands = (options: { localeCode: string }) => {
  return [];
};
