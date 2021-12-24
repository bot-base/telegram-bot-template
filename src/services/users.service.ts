import { logger } from "@bot/logger";
import { prisma } from "@bot/services";

export const createByTelegramId = async (
  telegramId: number,
  data: {
    languageCode?: string | null;
  }
) => {
  logger.debug({
    msg: "create user by telegram id",
    data,
    caller: __filename,
  });

  const { languageCode } = data;

  return await prisma.user.upsert({
    where: {
      telegramId,
    },
    update: {},
    create: {
      telegramId,
      languageCode,
    },
  });
};

export const updateByTelegramId = async (
  telegramId: number,
  data: {
    languageCode?: string | null;
  }
) => {
  logger.debug({
    msg: "update user by telegram id",
    data,
    caller: __filename,
  });

  const { languageCode } = data;

  return await prisma.user.update({
    where: {
      telegramId,
    },
    data: {
      languageCode,
    },
  });
};

export const getTotalCount = async () => {
  logger.debug({
    msg: "get total users count",
    caller: __filename,
  });

  return await prisma.user.count();
};
