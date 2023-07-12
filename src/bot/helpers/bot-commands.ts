import { i18n } from "~/bot/i18n";

export const DEFAULT_LANGUAGE_CODE = "en";

if (!i18n.locales.includes(DEFAULT_LANGUAGE_CODE)) {
  throw new Error(
    `Localization for default language code (${DEFAULT_LANGUAGE_CODE}) is missing`,
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
      description: i18n.t(options.localeCode, "stats_command.description"),
    },
    {
      command: "setcommands",
      description: i18n.t(
        options.localeCode,
        "setcommands_command.description",
      ),
    },
  ];

  return commands;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getGroupChatCommands = (options: { localeCode: string }) => {
  return [];
};
