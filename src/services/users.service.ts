import _ from "lodash";
import type { Prisma, PrismaClient } from "@prisma/client";
import type { PartialDeep } from "type-fest";

export const createService = (prisma: PrismaClient) =>
  Object.assign(prisma.user, {
    findByTelegramId: <T extends PartialDeep<Prisma.UserFindUniqueArgs>>(
      telegramId: number,
      args?: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs>
    ) => {
      const query: Prisma.UserFindUniqueArgs = {
        where: {
          telegramId,
        },
      };

      return prisma.user.findUnique(_.merge(query, args));
    },

    upsertByTelegramId: <T extends PartialDeep<Prisma.UserUpsertArgs>>(
      telegramId: number,
      args: Prisma.SelectSubset<T, Prisma.UserUpsertArgs>
    ) => {
      const query: Prisma.UserUpsertArgs = {
        where: {
          telegramId,
        },
        create: {
          telegramId,
        },
        update: {},
      };

      return prisma.user.upsert(_.merge(query, args));
    },

    updateByTelegramId: <T extends PartialDeep<Prisma.UserUpdateArgs>>(
      telegramId: number,
      args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs>
    ) => {
      const query: Prisma.UserUpdateArgs = {
        where: {
          telegramId,
        },
        data: {},
      };

      return prisma.user.update(_.merge(query, args));
    },
  });
