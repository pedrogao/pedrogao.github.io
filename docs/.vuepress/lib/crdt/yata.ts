import { randomString } from "../string";
import { Id, Vector } from "./op";

export type Item<T> = {
  content: T;
  id: Id;
  isDeleted: boolean;

  origin: Id | null; // null if insert at doc's begin
};

export class Doc<T> {
  content: Item<T>[];
  length: number;
  vector: Vector;
  clientId: string;

  public constructor(clientId?: string) {
    const cid = clientId ?? randomString(6);
    this.content = [];
    this.length = 0;
    this.vector = {};
    this.clientId = cid;
  }

  public insert(pos: number, content: T) {
    const clock = this.vector[this.clientId] ?? -1;
    // origin is previous item of pos
    const i = this.findPositionByIndex(pos);
    // create current item of pos
    const item: Item<T> = {
      content,
      id: [this.clientId, clock + 1],
      isDeleted: false,
      origin: this.content[i - 1]?.id ?? null,
    };

    this.integrate(item);
  }

  public delete(pos: number) {
    const i = this.findPositionByIndex(pos);
    const item = this.content[i];
    if (!item) {
      throw new Error("Item not found");
    }
    item.isDeleted = true;
    this.length -= 1;
  }

  public getVector(): Vector {
    return this.vector;
  }

  public getMissing(to: Vector): Item<T>[] {
    return this.content.filter((item) => Vector.in(item.id, to));
  }

  public getDeleteSet(): Id[] {
    const ds: Set<Id> = new Set();
    for (const item of this.content.values()) {
      if (!item.isDeleted) {
        continue;
      }
      if (ds.has(item.id)) {
        continue;
      }
      ds.add(item.id);
    }
    return Array.from(ds);
  }

  public merge(src: Doc<T>) {
    // Include deleted items
    const missing: (Item<T> | null)[] = src.content.filter(
      (item) => !Vector.in(item.id, this.vector)
    );

    let remaining = missing.length;
    // Some item integrate may rely on others that not merged currently
    // so we should merge them again
    while (remaining > 0) {
      for (let i = 0; i < missing.length; i++) {
        const item = missing[i];
        if (item === null || !this.canInsert(item)) {
          continue;
        }
        this.integrate(item);
        missing[i] = null;
        remaining--;
      }
    }
  }

  private integrate(item: Item<T>) {
    const lastClock = this.vector[item.id[0]] ?? -1;
    const clock = item.id[1];
    if (lastClock + 1 !== clock) {
      throw new Error("Clock not match");
    }
    this.vector[item.id[0]] = clock;

    // origin always front of the item
    // the origin.right may be conflict with the item
    // find the right place for the item start with origin.right
    let origin = this.findItemById(item.origin);
    let destIndex = origin + 1;
    let scanning = false;

    // search o, which i is successor of o
    // ir < or < o < i
    // or < o < ir < i
    // or = ir < minClient(o, i) < maxClient(o, i)

    // The logic below can be summarized in these two lines:
    // if (oleft < left || (oleft === left && newItem.id[0] <= o.id[0])) break
    // if (oleft === left) scanning = newItem.id[0] <= o.id[0]
    for (let i = destIndex; ; i++) {
      if (!scanning) {
        destIndex = i;
      }
      if (i === this.content.length) {
        break;
      }

      const o = this.content[i];
      const oorigin = this.findItemById(item.origin);
      // Insert i before o
      // case1: or < ir < i < o => break
      // case2: or = ir < min(i, o) < max(i, o) => break
      if (oorigin < origin || (oorigin === origin && item.id[0] <= o.id[0])) {
        break;
      }
      if (oorigin === origin) {
        scanning = item.id[0] <= o.id[0];
      }
    }

    if (!item.isDeleted) {
      this.length += 1;
    }
    this.content.splice(destIndex, 0, item);
  }

  private canInsert(item: Item<T>) {
    // Must insert sequentially
    return (
      !Vector.in(item.id, this.vector) &&
      (item.id[1] === 0 || // first insert item
        Vector.in([item.id[0], item.id[1] - 1], this.vector)) && // previous item is in version
      Vector.in(item.origin, this.vector)
    );
  }

  /**
   * Find the item by id, event the item is deleted
   */
  private findItemById(id: Id | null): number {
    if (id === null) {
      return -1;
    }

    let i = 0;
    for (; i < this.content.length; i++) {
      const item = this.content[i];
      if (Id.equals(item.id, id)) {
        return i;
      }
    }

    return -1;
  }

  private findPositionByIndex(index: number) {
    if (index < 0) {
      throw new Error("Index out of range");
    }

    if (this.content.length === 0) {
      if (index === 0) {
        return 0;
      } else {
        throw new Error("Index out of range");
      }
    }

    let j = index,
      i = 0;
    for (; i < this.content.length; i++) {
      const item = this.content[i];
      if (item.isDeleted) {
        continue;
      }

      if (j === 0) {
        break;
      }

      j--;
    }

    return i;
  }
}
