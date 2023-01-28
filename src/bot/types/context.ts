import { HydrateFlavor } from "@grammyjs/hydrate";
import { I18nFlavor } from "@grammyjs/i18n";
import { ParseModeFlavor } from "@grammyjs/parse-mode";
import { User } from "@prisma/client";
import { Context as DefaultContext, SessionFlavor } from "grammy";
import { Container } from "~/container";
import { Logger } from "~/logger";
import { SessionData } from "./session";

export interface ContextScope {
  user?: User;
}

export interface ExtendedContextFlavor {
  container: Container;
  scope: ContextScope;
  logger: Logger;
}

export type ContextScopeWith<P extends keyof ContextScope> = Record<
  "scope",
  Record<P, NonNullable<ContextScope[P]>>
>;

export type Context = ParseModeFlavor<
  HydrateFlavor<
    DefaultContext &
      I18nFlavor &
      SessionFlavor<SessionData> &
      ExtendedContextFlavor
  >
>;
