import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@moebius/grammy-fluent";

import { SessionData } from "@bot/types";

type BaseContext = DefaultContext &
  FluentContextFlavor &
  SessionFlavor<SessionData>;

export interface Context extends BaseContext {}
