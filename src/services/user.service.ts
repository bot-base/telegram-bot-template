import type { Prisma } from "@prisma/client";
import _ from "lodash";
import type { PartialDeep } from "type-fest";
import type { Logger } from "~/logger";
import type { PrismaClientX } from "~/prisma";

type Dependencies = {
  logger: Logger;
  prisma: PrismaClientX;
};

export class UserService {
  constructor({ prisma, logger }: Dependencies) {
    this.prisma = prisma;
    this.logger = logger;
  }

  logger: Dependencies["logger"];

  prisma: Dependencies["prisma"];

  findMany<T extends Prisma.UserFindManyArgs>(args?: T) {
    return this.prisma.user.findMany(args);
  }

  count<T extends Prisma.UserCountArgs>(args?: T) {
    return this.prisma.user.count(args);
  }

  findByTelegramId<T extends Prisma.UserArgs>(
    telegramId: number,
    select?: Prisma.SelectSubset<T, Prisma.UserArgs>
  ) {
    const query = {
      where: {
        telegramId,
      },
    } satisfies Prisma.UserFindUniqueArgsBase;

    return this.prisma.user.findUnique<T & typeof query>(
      _.merge(query, select)
    );
  }

  upsertByTelegramId<T extends Prisma.UserArgs>(
    telegramId: number,
    args: PartialDeep<Pick<Prisma.UserUpsertArgs, "create" | "update">>,
    select?: Prisma.SelectSubset<T, Prisma.UserArgs>
  ) {
    const query = {
      where: {
        telegramId,
      },
      create: {
        telegramId,
      },
      update: {},
    } satisfies Prisma.UserUpsertArgs;

    return this.prisma.user.upsert<T & typeof query>(
      _.merge(query, args, select)
    );
  }

  updateByTelegramId<T extends Prisma.UserArgs>(
    telegramId: number,
    args: PartialDeep<Pick<Prisma.UserUpdateArgs, "data">>,
    select?: Prisma.SelectSubset<T, Prisma.UserArgs>
  ) {
    const query = {
      where: {
        telegramId,
      },
      data: {},
    } satisfies Prisma.UserUpdateArgs;

    return this.prisma.user.update<T & typeof query>(
      _.merge(query, args, select)
    );
  }
}
