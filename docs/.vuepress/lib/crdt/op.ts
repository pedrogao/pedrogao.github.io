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
  compare(a: Id | null, b: Id | null) {
    return (
      a === b || (a !== null && b !== null && a[0] === b[0] && a[1] === b[1])
    );
  },
  hash(id: Id): string {
    return `${id[0]}:${id[1]}`;
  },
};

export type Op<T> = {
  type: OpType;
  value: T;
  id: Id;
};

export type Vector = Record<string, number>;

export const Vector = {
  in(id: Id | null, version: Vector) {
    // Special case: begin id is always in version
    if (id === null) {
      return true;
    }

    const clock = version[id[0]];
    return clock !== undefined && clock !== null && clock >= id[1];
  },
};
