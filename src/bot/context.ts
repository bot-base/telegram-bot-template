import type { Update, UserFromGetMe } from '@grammyjs/types'
import { type Api, Context as DefaultContext, type SessionFlavor } from 'grammy'
import type { AutoChatActionFlavor } from '@grammyjs/auto-chat-action'
import type { HydrateFlavor } from '@grammyjs/hydrate'
import type { I18nFlavor } from '@grammyjs/i18n'
import type { ParseModeFlavor } from '@grammyjs/parse-mode'
import type { Logger } from '#root/logger.js'
import type { Config } from '#root/config.js'

export interface SessionData {
  // field?: string;
}

interface ExtendedContextFlavor {
  logger: Logger
  config: Config
}

export type Context = ParseModeFlavor<
  HydrateFlavor<
    DefaultContext &
    ExtendedContextFlavor &
    SessionFlavor<SessionData> &
    I18nFlavor &
    AutoChatActionFlavor
  >
>

interface Dependencies {
  logger: Logger
  config: Config
}

export function createContextConstructor(
  {
    logger,
    config,
  }: Dependencies,
) {
  return class extends DefaultContext implements ExtendedContextFlavor {
    logger: Logger
    config: Config

    constructor(update: Update, api: Api, me: UserFromGetMe) {
      super(update, api, me)

      this.logger = logger.child({
        update_id: this.update.update_id,
      })
      this.config = config
    }
  } as unknown as new (update: Update, api: Api, me: UserFromGetMe) => Context
}
