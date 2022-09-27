import { fluent, locales } from "~/bot/helpers/i18n";

export const DEFAULT_LANGUAGE_CODE = "en";

if (!locales.includes(DEFAULT_LANGUAGE_CODE)) {
  throw new Error(
    `Localization for default language code (${DEFAULT_LANGUAGE_CODE}) is missing`
  );
}

export const getPrivateChatCommands = (options: {
  localeCode: string;
  includeLanguageCommand: boolean;
}) => {
  const t = fluent.withLocale(options.localeCode);

  const commands = [
    {
      command: "start",
      description: t("start_command.description"),
    },
  ];

  if (options.includeLanguageCommand) {
    commands.push({
      command: "language",
      description: t("language_command.description"),
    });
  }

  return commands;
};

export const getPrivateChatAdminCommands = (options: {
  localeCode: string;
  includeLanguageCommand: boolean;
}) => {
  const t = fluent.withLocale(options.localeCode);

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = fluent.withLocale(options.localeCode);

  return [];
};
