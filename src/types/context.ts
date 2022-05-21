import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@grammyjs/fluent";
import { ParseModeContext } from "@grammyjs/parse-mode";

import { LocalContext } from "@bot/context";
import { SessionData } from "./session";

interface LocalContextFlavor {
  local: LocalContext;
}

export type Context = DefaultContext &
  FluentContextFlavor &
  ParseModeContext &
  SessionFlavor<SessionData> &
  LocalContextFlavor;
