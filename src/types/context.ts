import { Context as DefaultContext, SessionFlavor } from "grammy";
import { FluentContextFlavor } from "@moebius/grammy-fluent";

import { SessionData } from "./session";

type BaseContext = DefaultContext &
  FluentContextFlavor &
  SessionFlavor<SessionData>;

export interface Context extends BaseContext {}
