import { isUserHasId } from "grammy-guard";
import { config } from "#root/config.js";

export const isBotAdmin = isUserHasId(...config.BOT_ADMIN_USER_ID);
