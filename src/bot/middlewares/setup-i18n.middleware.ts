import { Middleware } from "grammy";

import { i18n } from "~/bot/i18n";
import { Context } from "~/bot/types";

export const middleware = (): Middleware<Context> => i18n;
