import { Context } from "~/bot/types";
import { Role } from "@prisma/client";
import { LocalContextWith } from "~/bot/types/context";

export const isOwnerUser = <C extends Context>(
  ctx: C
): ctx is C & LocalContextWith<"user"> => {
  return ctx.local.user?.role === Role.OWNER;
};
