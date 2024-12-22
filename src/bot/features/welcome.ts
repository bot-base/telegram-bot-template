import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { Composer, Keyboard } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('start', logHandle('command-start'), async (ctx) => {
  return ctx.reply(ctx.t('welcome'), {
    reply_markup: new Keyboard().text('ping').resized(),
  })
})

export { composer as welcomeFeature }
