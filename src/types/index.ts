export { Context, LocalContextFlavor } from "./context";
export { SessionData } from "./session";

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
