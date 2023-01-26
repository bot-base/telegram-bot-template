import { Context } from "~/bot/types";
import { Role } from "@prisma/client";
import { LocalContextWith } from "~/bot/types/context";

export const isAdminUser = <C extends Context>(
  ctx: C
): ctx is C & LocalContextWith<"user"> => {
  return ctx.local.user?.role === Role.ADMIN;
};
