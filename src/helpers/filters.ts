import { config } from "@bot/config";
import { Context } from "@bot/types";

export const isPrivateChat = (ctx: Context) => ctx.chat?.type === "private";

export const isBasicGroup = (ctx: Context) => ctx.chat?.type === "group";

export const isSupergroup = (ctx: Context) => ctx.chat?.type === "supergroup";

export const isGroup = (ctx: Context) => isBasicGroup(ctx) || isSupergroup(ctx);

export const isChatAdmin = async (ctx: Context) => {
  if (ctx.from?.username === "GroupAnonymousBot") {
    return true;
  }

  if (ctx.from) {
    const chatMember = await ctx.getChatMember(ctx.from?.id);
    if (["creator", "administrator"].includes(chatMember.status)) {
      return true;
    }
  }

  return false;
};

export const isBotAdmin = (ctx: Context) =>
  ctx.from?.id === config.BOT_ADMIN_USER_ID;
