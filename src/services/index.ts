import { prisma } from "~/prisma";
import { createService as createUsersService } from "./users.service";

export const usersService = createUsersService(prisma);
