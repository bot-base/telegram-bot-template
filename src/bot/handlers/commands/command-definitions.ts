import { i18n } from "#root/bot/i18n.js";

export interface Command {
  command: string;
  description: (lang: string) => string;
  isAdmin?: true;
  scope?: "private" | "group" | "all";
}

export const commands: Command[] = [
  {
    command: "start",
    description: (lang) => i18n.t(lang, "start-command-description"),
    scope: "private",
  },
  {
    command: "ping",
    description: (lang) => i18n.t(lang, "ping-pong-command-description"),
    scope: "private",
  },
  {
    command: "setcommands",
    description: (lang) => i18n.t(lang, "setcommands-command-description"),
    isAdmin: true,
    scope: "private",
  },
];

export const languageCommand = {
  command: "language",
  description: (localeCode: string) => 
    i18n.t(localeCode, "language-command-description"),
  scope: "private",
} as const;
