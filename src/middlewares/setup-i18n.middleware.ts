import {
  GrammyFluentOptions,
  LocaleNegotiator,
  useFluent,
} from "@moebius/grammy-fluent";

import { fluent } from "@bot/helpers/i18n";
import { Context } from "@bot/types";

export const middleware = () =>
  useFluent({
    fluent,
    localeNegotiator: (ctx: Context) =>
      ctx.session.user.languageCode || ctx?.from?.language_code,
  } as GrammyFluentOptions & {
    localeNegotiator: LocaleNegotiator<Context>;
  });
