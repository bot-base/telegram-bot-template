import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@moebius/grammy-fluent";
import { ParseModeContext } from "parse-mode";

import { SessionData } from "./session";

type BaseContext = DefaultContext &
  FluentContextFlavor &
  ParseModeContext &
  SessionFlavor<SessionData>;

export interface Context extends BaseContext {}
