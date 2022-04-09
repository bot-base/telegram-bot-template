import { Prisma } from "@prisma/client";
import { prisma } from "@bot/prisma";

export const upsertByTelegramId = async (
  telegramId: number,
  data: Omit<Prisma.UserCreateInput, "telegramId">
) => {
  return prisma.user.upsert({
    where: {
      telegramId,
    },
    create: {
      ...{
        telegramId,
      },
      ...data,
    },
    update: data,
  });
};

export const updateByTelegramId = async (
  telegramId: number,
  data: Prisma.UserUpdateInput
) => {
  return prisma.user.update({
    where: {
      telegramId,
    },
    data,
  });
};

export const getTotalCount = async () => {
  return prisma.user.count();
};
