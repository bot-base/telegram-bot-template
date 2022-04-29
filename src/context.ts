import { AsyncLocalStorage } from "async_hooks";
import { User } from "@prisma/client";
import { Logger } from "pino";

export interface LocalContext {
  user?: User;
  logger?: Logger;
}

export const context = new AsyncLocalStorage<LocalContext>();
