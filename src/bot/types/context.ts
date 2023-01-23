import { Context as DefaultContext, SessionFlavor } from "grammy";
import { I18nFlavor } from "@grammyjs/i18n";
import { ParseModeFlavor } from "@grammyjs/parse-mode";
import { HydrateFlavor } from "@grammyjs/hydrate";

import { LocalContext } from "~/bot/context";
import { SessionData } from "./session";

export interface LocalContextFlavor {
  local: LocalContext;
}

export type LocalContextWith<P extends keyof LocalContext> = Record<
  "local",
  Record<P, NonNullable<LocalContext[P]>>
>;

export type Context = ParseModeFlavor<
  HydrateFlavor<
    DefaultContext &
      I18nFlavor &
      SessionFlavor<SessionData> &
      LocalContextFlavor
  >
>;
