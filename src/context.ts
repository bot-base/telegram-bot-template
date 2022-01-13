import { AsyncLocalStorage } from "async_hooks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const context = new AsyncLocalStorage<Map<string, any>>();
