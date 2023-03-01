import { createUserRequestRegistry } from "grammy-guard";

export const userRequests = createUserRequestRegistry().add("make-admin", 1);
