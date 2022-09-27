import { Middleware } from "grammy";
import { LocaleNegotiator, useFluent } from "@grammyjs/fluent";

import { fluent } from "~/bot/helpers/i18n";
import { Context } from "~/bot/types";

const localeNegotiator = (ctx: Context) =>
  (ctx.chat && ctx.session.languageCode) || ctx.from?.language_code;

export const middleware = (): Middleware<Context> =>
  useFluent({
    fluent,
    localeNegotiator: localeNegotiator as LocaleNegotiator,
  });
