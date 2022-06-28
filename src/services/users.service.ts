import _ from "lodash";
import { Prisma, PrismaClient } from "@prisma/client";
import { DeepPartial } from "@bot/types";

export const createService = (prisma: PrismaClient) =>
  Object.assign(prisma.user, {
    upsertByTelegramId: <T extends DeepPartial<Prisma.UserUpsertArgs>>(
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

    updateByTelegramId: <T extends DeepPartial<Prisma.UserUpdateArgs>>(
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
