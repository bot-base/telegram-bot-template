import { isUserHasId } from 'grammy-guard'
import { config } from '#root/config.js'

export const isAdmin = isUserHasId(...config.BOT_ADMINS)
