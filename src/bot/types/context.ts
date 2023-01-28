import { Context as DefaultContext, SessionFlavor } from "grammy";
import { I18nFlavor } from "@grammyjs/i18n";
import { ParseModeFlavor } from "@grammyjs/parse-mode";
import { HydrateFlavor } from "@grammyjs/hydrate";
import { User } from "@prisma/client";

import { Logger } from "~/logger";
import { Container } from "~/container";
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
