export enum OpType {
  // Counter op types
  Increment = "increment",
  Decrement = "decrement",

  // Register op types
  Set = "set",

  // MultiLWWRegister op types
  KV = "kv",
}

export type Id = [string, number];

export const Id = {
  equals(a: Id, b: Id): boolean {
    return a === b || (a[0] === b[0] && a[1] === b[1]);
  },
};

export type Op<T> = {
  type: OpType;
  value: T;
  id: Id;
};
