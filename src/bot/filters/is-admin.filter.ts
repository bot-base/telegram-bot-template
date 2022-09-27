import { Context } from "~/bot/types";
import { Role } from "@prisma/client";

export const filter = (ctx: Context) => {
  return ctx.local.user?.role === Role.ADMIN;
};
