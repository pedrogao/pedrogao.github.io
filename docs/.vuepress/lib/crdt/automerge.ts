/**
 * @license MIT
 * Implementation of Tiny Automerge
 */
export type Actor = number;

export const Actor = {
  create(): Actor {
    return Math.floor(Math.random() * 2 ** 31);
  },
};

export type OpId = string;
export const ROOT: OpId = "0@0";

export const OpId = {
  create(actor: Actor, clock: number): OpId {
    return `${actor}@${clock}`;
  },
  parse(id: OpId): [Actor, number] {
    const [actor, clock] = id.split("@");
    return [parseInt(actor), parseInt(clock)];
  },
  next(id: OpId): OpId {
    const [actor, clock] = this.parse(id);
    return this.create(actor, clock + 1);
  },
  next2(actor: Actor, clock: number): OpId {
    return this.create(actor, clock + 1);
  },
  compare(a: OpId, b: OpId): number {
    const [actorA, clockA] = this.parse(a);
    const [actorB, clockB] = this.parse(b);
    // Compare by clock first
    const clockDiff = clockA - clockB;
    if (clockDiff !== 0) {
      return clockDiff;
    }
    return actorA - actorB;
  },
};

export type ObjId = OpId;

export enum ObjType {
  Map = "map",
  List = "list",
}

export type Operation<T> = {
  id: OpId;
  prop: string; // map property name or array insert|update origin intention
  insert: boolean;
  value: T | null | "make(map)" | "make(list)"; // null means delete
  pred: OpId[];
  succ: OpId[];
};

type OpTree<T> = {
  parent: ObjId | null; // null means root
  objType: ObjType; // map or list
  store: Array<Operation<T>>; // sorted by OpId or Prop
};

type OpSet<T> = {
  // Op trees
  trees: Map<ObjId, OpTree<T>>;
  // The length of op array
  length: number;
};

export type Doc<T> = {
  ops: OpSet<T>;
  // The current actor.
  id: Actor;
  // The maximum operation counter this document has seen.
  maxOpCount: number;
};

const insertAt = <T>(arr: T[], index: number, value: T) => {
  arr.splice(index, 0, value);
};

export const Doc = {
  create<T>(actor?: Actor): Doc<T> {
    const root: OpTree<T> = {
      parent: null,
      objType: "map", // root is always map
      store: [],
    } as OpTree<T>;
    const actorId = actor ?? Actor.create();
    return {
      ops: {
        trees: new Map([[ROOT, root]]),
        length: 0,
      },
      id: actorId,
      maxOpCount: 0,
    };
  },
  dump<T>(doc: Doc<T>) {
    const ops = Array.from(doc.ops.trees.entries())
      .map(([obj, tree]) => {
        return Array.from(tree.store.values()).map((op) => {
          return {
            ...op,
            obj,
          };
        });
      })
      .flat();

    console.table(ops, [
      "id",
      "insert",
      "obj",
      "prop",
      "value",
      "pred",
      "succ",
    ]);
  },
  putObject<T>(doc: Doc<T>, obj: ObjId, prop: string, objType: ObjType) {
    const tree = doc.ops.trees.get(obj);
    if (!tree) {
      throw new Error(`Object ${obj} not found`);
    }

    const opId = OpId.next2(doc.id, doc.maxOpCount);
    const value = objType === ObjType.Map ? "make(map)" : "make(list)";
    const op: Operation<T> = {
      id: opId,
      prop,
      insert: false,
      value,
      pred: [],
      succ: [],
    };
    tree.store.push(op);

    const store: Operation<T>[] = [];
    const subObj = {
      parent: obj,
      objType,
      store,
    } as OpTree<T>;
    doc.ops.trees.set(op.id, subObj);

    doc.ops.length++;
    doc.maxOpCount++;
    return op.id;
  },
  put<T>(doc: Doc<T>, obj: ObjId, propOrIndex: string | number, value: T) {
    const tree = doc.ops.trees.get(obj);
    if (!tree) {
      throw new Error(`Object ${obj} not found`);
    }

    switch (tree.objType) {
      case ObjType.Map:
        return mapPut(doc, obj, propOrIndex as string, value);

      case ObjType.List:
        return listPut(doc, obj, propOrIndex as number, value);

      default:
        throw new Error(`Unknown object type ${tree.objType}`);
    }
  },
  get<T>(doc: Doc<T>, obj: ObjId, propOrIndex: string | number) {
    const tree = doc.ops.trees.get(obj);
    if (!tree) {
      throw new Error(`Object ${obj} not found`);
    }

    switch (tree.objType) {
      case ObjType.Map:
        return mapGet(doc, obj, propOrIndex as string);

      case ObjType.List:
        return listGet(doc, obj, propOrIndex as number);

      default:
        throw new Error(`Unknown object type ${tree.objType}`);
    }
  },
  delete<T>(doc: Doc<T>, obj: ObjId, propOrIndex: string | number) {
    const tree = doc.ops.trees.get(obj);
    if (!tree) {
      throw new Error(`Object ${obj} not found`);
    }

    switch (tree.objType) {
      case ObjType.Map:
        return mapDelete(doc, obj, propOrIndex as string);

      case ObjType.List:
        return listDelete(doc, obj, propOrIndex as number);

      default:
        throw new Error(`Unknown object type ${tree.objType}`);
    }
  },
  insert<T>(doc: Doc<T>, obj: ObjId, index: number, value: T) {
    const tree = doc.ops.trees.get(obj);
    if (!tree) {
      throw new Error(`Object ${obj} not found`);
    }

    switch (tree.objType) {
      case ObjType.Map:
        throw new Error("Cannot insert into map");

      case ObjType.List:
        return listInsert(doc, obj, index, value);

      default:
        throw new Error(`Unknown object type ${tree.objType}`);
    }
  },
  range<T>(doc: Doc<T>, obj: ObjId, start?: number, end?: number) {
    const tree = doc.ops.trees.get(obj);
    if (!tree) {
      throw new Error(`Object ${obj} not found`);
    }

    switch (tree.objType) {
      case ObjType.Map:
        return mapRange(doc, obj, start, end);

      case ObjType.List:
        return listRange(doc, obj, start, end);

      default:
        throw new Error(`Unknown object type ${tree.objType}`);
    }
  },
};

//
// There is no abstraction of repeated parts,
// and the original steps of the algorithm are retained for easy understanding.
//

/* --------------------------- */
/*        Map operations       */
/* --------------------------- */
const mapPut = <T>(doc: Doc<T>, obj: ObjId, prop: string, value: T) => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  // Find last op matching prop
  const [ops, pos] = getMapOps(tree, prop);
  const lastOp = ops.length ? ops[ops.length - 1] : null;
  const pred = lastOp ? [lastOp.id] : [];
  const opId = OpId.next2(doc.id, doc.maxOpCount);
  const op: Operation<T> = {
    id: opId,
    prop,
    insert: false,
    value,
    pred,
    succ: [],
  };

  lastOp?.succ.push(op.id);
  insertAt(tree.store, pos, op);
  doc.ops.length++;
  doc.maxOpCount++;
  return opId;
};

const mapGet = <T>(doc: Doc<T>, obj: ObjId, prop: string): T | null => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  const lastOp = getMapLastOp(tree, prop);
  if (!lastOp || lastOp.succ.length > 0) {
    return null;
  }

  return lastOp.value as T;
};

const mapDelete = <T>(doc: Doc<T>, obj: ObjId, prop: string) => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  const lastOp = getMapLastOp(tree, prop);
  if (!lastOp) {
    throw new Error(`Object ${obj}-${prop} not found, cannot delete`);
  }

  // Delete not append op, but increment opId and set opId to the pred op
  const opId = OpId.next2(doc.id, doc.maxOpCount);
  lastOp.succ.push(opId);

  // doc.ops.length--;
  doc.maxOpCount++;
  return opId;
};

const mapRange = <T>(doc: Doc<T>, obj: ObjId, start?: number, end?: number) => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  const startIndex = start ?? 0;
  let index = 0;
  const entries: [string, T][] = [];
  for (const op of tree.store.values()) {
    if (op.succ.length === 0) {
      if (index >= startIndex && (end === undefined || index < end)) {
        entries.push([op.prop, op.value as T]);
      }
      index++;
    }
  }
  return entries;
};

const getMapLastOp = <T>(
  tree: OpTree<T>,
  prop: string
): Operation<T> | null => {
  if (tree.store.length === 0) {
    return null;
  }

  const [ops, _] = getMapOps(tree, prop);
  if (ops === null || ops.length === 0) {
    return null;
  }

  return ops[ops.length - 1];
};

const getMapOps = <T>(
  tree: OpTree<T>,
  prop: string
): [Operation<T>[], number] => {
  if (tree.store.length === 0) {
    return [[], 0];
  }

  let ops: Operation<T>[] = [];
  let first = -1;
  for (const [i, op] of tree.store.entries()) {
    if (op.prop === prop && first === -1) {
      first = i;
    }
    if (first !== -1 && op.prop !== prop) {
      return [ops, i];
    }
    if (first !== -1) {
      ops.push(op);
    }
  }

  return [ops, tree.store.length];
};

/* --------------------------- */
/*        List operations       */
/* --------------------------- */

const listRange = <T>(
  doc: Doc<T>,
  obj: string,
  start: number | undefined,
  end: number | undefined
) => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  const startIndex = start ?? 0;
  let index = 0;
  const entries: T[] = [];
  for (const op of tree.store.values()) {
    if (op.succ.length === 0) {
      if (index >= startIndex && (end === undefined || index < end)) {
        entries.push(op.value as T);
      }
      index++;
    }
  }
  return entries;
};

const listPut = <T>(doc: Doc<T>, obj: ObjId, index: number, value: T) => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  const [ops, pos] = listNth(tree, index);
  if (ops === null || ops.length === 0) {
    throw new Error(`Index at ${index} not found`);
  }

  const firstOp = ops[0];
  const lastOp = ops[ops.length - 1];
  const opId = OpId.next2(doc.id, doc.maxOpCount);
  const pred = firstOp ? [firstOp.id] : [];
  const op: Operation<T> = {
    id: opId,
    prop: lastOp.id, // Insert intention
    insert: false, // Must be false
    value,
    pred,
    succ: [],
  };
  firstOp.succ.push(opId);
  insertAt(tree.store, pos, op);
  doc.maxOpCount++;
  doc.ops.length++;

  return opId;
};

const listDelete = <T>(doc: Doc<T>, obj: ObjId, index: number) => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  const [ops, _] = listNth(tree, index);
  if (ops === null || ops.length === 0) {
    throw new Error(`Index at ${index} not found`);
  }

  const firstOp = ops[0];
  const opId = OpId.next2(doc.id, doc.maxOpCount);
  firstOp.succ.push(opId);

  doc.maxOpCount++;
  return opId;
};

const listInsert = <T>(doc: Doc<T>, obj: ObjId, index: number, value: T) => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  const [ops, pos] = listNth(tree, index);
  const firstOp = ops.length > 0 ? ops[0] : null;
  const prop = firstOp ? (firstOp.insert ? firstOp.id : firstOp.prop) : obj;
  const pred = firstOp ? [firstOp.id] : [];
  const opId = OpId.next2(doc.id, doc.maxOpCount);
  const op: Operation<T> = {
    id: opId,
    prop, // insert intention
    insert: true,
    value,
    pred,
    succ: [],
  };

  firstOp?.succ.push(opId);
  insertAt(tree.store, pos, op);
  doc.maxOpCount++;
  doc.ops.length++;

  return opId;
};

const listGet = <T>(doc: Doc<T>, obj: ObjId, index: number): T | null => {
  const tree = doc.ops.trees.get(obj);
  if (!tree) {
    throw new Error(`Object ${obj} not found`);
  }

  const [ops, _] = listNth(tree, index);
  if (ops === null || ops.length === 0) {
    return null;
  }

  const firstOp = ops[0];
  if (firstOp.succ.length > 0) {
    return null;
  }

  return firstOp.value as T;
};

const listNth = <T>(
  tree: OpTree<T>,
  index: number
): [Operation<T>[], number] => {
  // 1. search n'th insert op, not put
  // 2. insert 1 not 0, what's happening? throw error!
  // 3. put 0 before insert 0, throw error!
  // 4. delete 0 before insert 0, throw error!
  let seen = 0,
    pos = 0;
  const ops: Operation<T>[] = [];
  for (const op of tree.store.values()) {
    if (seen === index && op.succ.length === 0) {
      ops.push(op);
    }
    if (op.insert && op.succ.length === 0) {
      seen++;
      if (seen > index) {
        break;
      }
    }

    pos++;
  }
  return [ops, pos];
};
