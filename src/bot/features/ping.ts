import type { Context } from '#root/bot/context.js'
import { logHandle } from '#root/bot/helpers/logging.js'
import { Composer } from 'grammy'

const composer = new Composer<Context>()

const feature = composer.chatType('private')

feature.command('ping', logHandle('command-ping-pong'), (ctx) => {
  return ctx.reply('pong')
})

feature.filter((ctx) => ctx.msg?.text?.toLocaleLowerCase() === 'ping').on('msg:text', logHandle('msg-ping-pong'), (ctx) => {
  return ctx.reply('pong')
})

export { composer as PingFeature }
