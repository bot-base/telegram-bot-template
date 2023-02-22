import { Prisma, PrismaClient } from "@prisma/client";
import { Logger } from "~/logger";

import userExtension from "~/prisma/user.extension";

const parseParameters = (parameters: string): unknown[] => {
  try {
    return JSON.parse(parameters) as unknown[];
  } catch {
    return [];
  }
};

export const createPrisma = (logger: Logger) => {
  const prisma = new PrismaClient({
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "error",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });

  prisma.$on("query", (e: Prisma.QueryEvent) => {
    const parameters = parseParameters(
      e.params.replace(
        /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.?\d* UTC/g,
        (date) => `"${date}"`
      )
    );
    const query = e.query.replace(
      /(\?|\$\d+)/g,
      (match, param, offset, string: string) => {
        const parameter = JSON.stringify(parameters.shift());
        const previousChar = string.charAt(offset - 1);

        return (previousChar === "," ? " " : "") + parameter;
      }
    );

    logger.debug({
      msg: "database query",
      query,
      duration: e.duration,
    });
  });

  prisma.$on("error", (e: Prisma.LogEvent) => {
    logger.error({
      msg: "database error",
      target: e.target,
      message: e.message,
    });
  });

  prisma.$on("info", (e: Prisma.LogEvent) => {
    logger.info({
      msg: "database info",
      target: e.target,
      message: e.message,
    });
  });

  prisma.$on("warn", (e: Prisma.LogEvent) => {
    logger.warn({
      msg: "database warning",
      target: e.target,
      message: e.message,
    });
  });

  return prisma.$extends(userExtension);
};

export type PrismaClientX = ReturnType<typeof createPrisma>;
