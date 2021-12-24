import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export * as usersService from "./users.service";
