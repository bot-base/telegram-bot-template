import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";
import { HydrateFlavor } from "@grammyjs/hydrate";

import { LocalContext } from "~/bot/context";
import { SessionData } from "./session";

export interface LocalContextFlavor {
  local: LocalContext;
}

export type Context = HydrateFlavor<
  DefaultContext &
    FluentContextFlavor &
    ParseModeContext &
    SessionFlavor<SessionData> &
    LocalContextFlavor
>;
