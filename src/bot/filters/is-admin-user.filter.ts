import { Context, ContextScopeWith } from "~/bot/context";

export const isAdminUser = <C extends Context>(
  ctx: C
): ctx is C & ContextScopeWith<"user"> => {
  return ctx.scope.user?.isAdmin === true;
};
