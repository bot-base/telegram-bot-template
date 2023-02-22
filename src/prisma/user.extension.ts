import { Prisma, Role } from "@prisma/client";
import type { PrismaClientX } from "~/prisma";

export default Prisma.defineExtension({
  name: "user",
  result: {
    user: {
      isAdmin: {
        needs: { role: true },
        compute(user) {
          return user.role === Role.ADMIN;
        },
      },

      isOwner: {
        needs: { role: true },
        compute(user) {
          return user.role === Role.OWNER;
        },
      },
    },
  },
  model: {
    user: {
      byTelegramId(telegramId: number) {
        return {
          telegramId,
        } satisfies Prisma.UserWhereInput;
      },

      hasAdminRole() {
        return {
          role: Role.ADMIN,
        } satisfies Prisma.UserWhereInput;
      },

      hasOwnerRole() {
        return {
          role: Role.OWNER,
        } satisfies Prisma.UserWhereInput;
      },

      withRoles() {
        return {
          role: true,
          isAdmin: true,
          isOwner: true,
        } satisfies Prisma.UserSelect<PrismaClientX["$extends"]["extArgs"]>;
      },
    },
  },
});
