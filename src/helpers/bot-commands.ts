import { fluent, locales } from "@bot/helpers/i18n";

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
      description: t("start_command_description"),
    },
  ];

  if (options.includeLanguageCommand) {
    commands.push({
      command: "language",
      description: t("language_command_description"),
    });
  }

  return commands;
};

export const getGroupChatCommands = (options: { localeCode: string }) => {
  const t = fluent.withLocale(options.localeCode);

  return [];
};
