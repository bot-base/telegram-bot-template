import _ from "lodash";
import type { Prisma, PrismaClient } from "@prisma/client";
import type { PartialDeep } from "type-fest";

export const createService = (prisma: PrismaClient) =>
  Object.assign(prisma.user, {
    findByTelegramId: <T extends Prisma.UserArgs>(
      telegramId: number,
      select?: Prisma.SelectSubset<T, Prisma.UserArgs>
    ) => {
      const query = {
        where: {
          telegramId,
        },
      } satisfies Prisma.UserFindUniqueArgsBase;

      return prisma.user.findUnique<T & typeof query>(_.merge(query, select));
    },

    upsertByTelegramId: <T extends Prisma.UserArgs>(
      telegramId: number,
      args: PartialDeep<Pick<Prisma.UserUpsertArgs, "create" | "update">>,
      select?: Prisma.SelectSubset<T, Prisma.UserArgs>
    ) => {
      const query = {
        where: {
          telegramId,
        },
        create: {
          telegramId,
        },
        update: {},
      } satisfies Prisma.UserUpsertArgs;

      return prisma.user.upsert<T & typeof query>(_.merge(query, args, select));
    },

    updateByTelegramId: <T extends Prisma.UserArgs>(
      telegramId: number,
      args: PartialDeep<Pick<Prisma.UserUpdateArgs, "data">>,
      select?: Prisma.SelectSubset<T, Prisma.UserArgs>
    ) => {
      const query = {
        where: {
          telegramId,
        },
        data: {},
      } satisfies Prisma.UserUpdateArgs;

      return prisma.user.update<T & typeof query>(_.merge(query, args, select));
    },
  });
