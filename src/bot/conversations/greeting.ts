import type { Context } from '#root/bot/context.js'
import type { Conversation } from '@grammyjs/conversations'
import type { Context as DefaultContext } from 'grammy'
import { createConversation } from '@grammyjs/conversations'

export const GREETING_CONVERSATION = 'greeting'

type ConversationContext =
  & DefaultContext

export function greetingConversation() {
  return createConversation(
    async (conversation: Conversation<Context, ConversationContext>, ctx: ConversationContext) => {
      await ctx.reply('Please send me your name')

      while (true) {
        ctx = await conversation.wait()

        if (ctx.hasCommand('cancel')) {
          return ctx.reply('Cancelled')
        }
        else if (ctx.has('message:text')) {
          await ctx.reply(`Hello, ${ctx.message.text}!`)
        }
        else {
          await ctx.reply('Please send me your name')
        }
      }
    },
    GREETING_CONVERSATION,
  )
}
