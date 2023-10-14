import { randomString } from "../string";
import { Id, Vector } from "./op";

export type Item<T> = {
  content: T | null; // root item has no content
  id: Id;
  isDeleted: boolean;
  children: Id[]; // children of this item
  parent: Id | null; // parent of this item
};

export class Doc<T> {
  root: Id;
  length: number;
  vector: Vector;
  clientId: string;
  store: Map<string, Item<T>>;

  public constructor(clientId?: string) {
    const cid = clientId ?? randomString(6);
    const root = {
      content: null,
      id: [cid, 0],
      isDeleted: false,
      children: [],
      parent: null,
    } as Item<T>;

    // Root item should insert at the beginning, and could not be deleted or updated
    this.root = root.id;
    this.length = 0; // Exclude root item
    this.vector = {
      [cid]: 0,
    };
    this.clientId = cid;
    this.store = new Map([[Id.hash(root.id), root]]);
  }

  public getContent(): T[] {
    const doc = this;
    const content: T[] = [];
    const queue: Id[] = [];

    queue.push(doc.root);
    while (queue.length > 0) {
      const id = queue.shift()!;
      const item = doc.store.get(Id.hash(id))!;
      if (!item.isDeleted && item.content !== null) {
        content.push(item.content);
      }
      queue.push(...item.children);
    }

    return content;
  }

  public insert(pos: number, content: T) {
    const item = this.findItemByIndex(pos - 1);
    if (!item) {
      throw new Error("Item not found");
    }

    const newItem = {
      content,
      id: [this.clientId, this.vector[this.clientId] + 1],
      isDeleted: false,
      children: [],
      parent: item.id,
    } as Item<T>;

    this.integrate(newItem);
  }

  public delete(pos: number) {
    const item = this.findItemByIndex(pos);
    if (!item) {
      throw new Error("Item not found");
    }
    item.isDeleted = true;
    this.length -= 1;
  }

  private integrate(item: Item<T>) {
    const lastClock = this.vector[item.id[0]] ?? 0;
    const clock = item.id[1];
    if (lastClock >= clock) {
      // This item has been integrated
      return;
    }
    if (lastClock + 1 !== clock) {
      throw new Error("Clock not match");
    }
    this.vector[item.id[0]] = clock;
    // 1. Find the parent item
    // 2. Insert the new item to parent.children, compare the id of new item and the next item
    // 3. Update the version and length of doc
    const parent =
      item.parent![1] === 0
        ? this.store.get(Id.hash(this.root))!
        : this.store.get(Id.hash(item.parent!))!;
    if (!parent) {
      // Root item can not integrate
      throw new Error("Parent not found");
    }

    let destIndex = 0;
    for (; destIndex < parent.children.length; destIndex++) {
      const child = parent.children[destIndex];
      // Smaller id should at left
      if (item.id[0] <= child[0]) {
        break;
      }
    }

    parent.children.splice(destIndex, 0, item.id);
    this.store.set(Id.hash(item.id), item);
    if (!item.isDeleted && item.content !== null) {
      this.length += 1;
    }
  }

  public getVector(): Vector {
    return this.vector;
  }

  public getMissing(to: Vector): Item<T>[] {
    const missing: Id[] = [];
    const queue: Id[] = [];
    // DFS
    queue.push(this.root);
    while (queue.length > 0) {
      const id = queue.shift()!;
      // Include deleted items
      const item = this.store.get(Id.hash(id))!;
      // Exclude root item
      if (item.content !== null && !Vector.in(item.id, to)) {
        missing.push(id);
      }
      queue.push(...item.children);
    }

    return missing.map((id) => {
      const item = this.store.get(Id.hash(id))!;
      return {
        content: item.content,
        id: item.id,
        isDeleted: item.isDeleted,
        parent: item.parent,
        children: [], // children should be empty
      };
    });
  }

  public getDeleteSet(): Id[] {
    const ds: Set<Id> = new Set();
    for (const item of this.store.values()) {
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

  public merge(missing: (Item<T> | null)[], ds: Set<Id>) {
    missing = missing.filter((item) => {
      if (item === null) {
        return false;
      }
      const lastClock = this.vector[item.id[0]] ?? 0;
      const clock = item.id[1];
      if (lastClock >= clock) {
        // This item has been integrated
        return false;
      }
      return true;
    });
    let remaining = missing.length;
    if (remaining === 0) {
      console.log("Nothing to merge");
      this.mergeDeleteSet(ds);
      return;
    }
    // Some item integrate may rely on others that not merged currently
    // so we should merge them again
    let retry = 5;
    while (remaining > 0 && retry > 0) {
      for (let i = 0; i < missing.length; i++) {
        const item = missing[i];
        if (item === null) {
          continue;
        }
        if (!this.canInsert(item)) {
          continue;
        }
        this.integrate(item);
        missing.splice(i, 1);
        remaining--;
      }
      retry--;
    }
    this.mergeDeleteSet(ds);

    if (retry === 0 && remaining > 0) {
      console.error(missing);
      throw new Error("Merge failed");
    }
  }

  public mergeDeleteSet(ds: Set<Id>) {
    const queue: Id[] = [];
    // DFS
    const inDs = (id: Id) => {
      for (const i of ds.values()) {
        if (Id.equals(i, id)) {
          return true;
        }
      }
      return false;
    };
    queue.push(this.root);
    while (queue.length > 0) {
      const id = queue.shift()!;
      // Include deleted items
      const item = this.store.get(Id.hash(id))!;
      // Exclude root item
      if (item.content !== null && !item.isDeleted && inDs(item.id)) {
        item.isDeleted = true;
      }
      queue.push(...item.children);
    }
  }

  private canInsert(item: Item<T>): boolean {
    return (
      !Vector.in(item.id, this.vector) &&
      (item.parent?.[1] === 0 || Vector.in(item.parent, this.vector))
    );
  }

  private findItemByIndex(pos: number): Item<T> | null {
    if (pos === -1) {
      return this.store.get(Id.hash(this.root))!;
    }

    const queue: Id[] = [];
    let i = pos;
    // DFS
    queue.push(this.root);
    while (queue.length > 0) {
      const id = queue.shift()!;
      const item = this.store.get(Id.hash(id))!;
      if (item.content === null) {
        queue.push(...item.children);
        continue;
      }

      if (i === 0 && !item.isDeleted) {
        return item;
      }

      if (!item.isDeleted) {
        i--;
      }
      queue.push(...item.children);
    }

    return null;
  }
}
