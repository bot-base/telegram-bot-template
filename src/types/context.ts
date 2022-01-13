import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@moebius/grammy-fluent";
import { ParseModeContext } from "parse-mode";

import { SessionData } from "./session";

export type Context = DefaultContext &
  FluentContextFlavor &
  ParseModeContext &
  SessionFlavor<SessionData>;
