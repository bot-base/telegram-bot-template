import { Role } from "@prisma/client";
import { Context, ContextScopeWith } from "~/bot/context";

export const isOwnerUser = <C extends Context>(
  ctx: C
): ctx is C & ContextScopeWith<"user"> => {
  return ctx.scope.user?.role === Role.OWNER;
};
