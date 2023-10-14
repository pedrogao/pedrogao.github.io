import { randomString } from "../string";
import { Id, Vector } from "./op";

export class ContentAny {
  arr: any[];

  constructor(arr?: any[]) {
    this.arr = arr ?? [];
  }

  public getLength(): number {
    return this.arr.length;
  }

  public getContent(): any[] {
    return this.arr;
  }

  public getLast(): any | null {
    if (this.arr.length === 0) {
      return null;
    }
    return this.arr[this.arr.length - 1];
  }
}

export type ItemInfo = {
  id: Id;
  originLeft: Id | null;
  originRight: Id | null;
  parentKey: string | null;
  parentSub: string | null;
  isDeleted: boolean;
  content: ContentAny;
};

export class Item {
  content: ContentAny;
  id: Id;
  isDeleted: boolean;

  originLeft: Id | null; // null if insert at doc's begin
  originRight: Id | null; // null if insert at doc's end

  left: Item | null;
  right: Item | null;

  parent: AbstractType | null;
  parentSub: string | null;

  public constructor(
    content: ContentAny,
    id: Id,
    isDeleted: boolean,
    originLeft: Id | null,
    originRight: Id | null,
    left: Item | null,
    right: Item | null,
    parent: AbstractType | null,
    parentSub: string | null
  ) {
    this.content = content;
    this.id = id;
    this.isDeleted = isDeleted;
    this.originLeft = originLeft;
    this.originRight = originRight;
    this.left = left;
    this.right = right;
    this.parent = parent;
    this.parentSub = parentSub;
  }

  public getOriginLeft(): Id | null {
    return this.originLeft;
  }

  public getOriginRight(): Id | null {
    return this.originRight;
  }

  public getLeft(): Item | null {
    return this.left;
  }

  public getRight(): Item | null {
    return this.right;
  }

  public integrate(doc: Doc) {
    const parent: AbstractType = this.parent!;
    const parentSub = this.parentSub;
    const getItem = (id: Id | null) => doc.getItem(id);
    if (
      (!this.left && (!this.right || this.right.left !== null)) ||
      (this.left && this.left.right !== this.right)
    ) {
      let left = this.left; // 插入时的左边节点，即插入origin

      let o; // 是否具有冲突的节点
      // set o to the first conflicting item
      if (left !== null) {
        // list, text set left to the first conflicting item
        o = left.right;
      } else if (parentSub !== null) {
        // map sets left to the first item with the same key
        o = parent._map.get(parentSub) || null;
        while (o !== null && o.left !== null) {
          // map, set o to the first item of key
          o = o.left;
        }
      } else {
        o = parent._start; // default set o to the first item
      }

      const conflictingItems = new Set();
      const itemsBeforeOrigin = new Set();
      // Let c in conflictingItems, b in itemsBeforeOrigin
      // ***{origin}bbbb{this}{c,b}{c,b}{o}***
      // Note that conflictingItems is a subset of itemsBeforeOrigin
      while (o !== null && o !== this.right) {
        itemsBeforeOrigin.add(o);
        conflictingItems.add(o);
        if (Id.compare(this.originLeft, o.originLeft)) {
          // case 1
          if (o.id[0] < this.id[0]) {
            // 如果o的clientID小于this的clientID，那么o在this的左边，大的在右边
            left = o;
            conflictingItems.clear();
          } else if (Id.compare(this.originRight, o.originRight)) {
            // 右插入意图相同，则直接break
            // this and o are conflicting and point to the same integration points. The id decides which item comes first.
            // Since this is to the left of o, we can break here
            break;
          } // else, o might be integrated before an item that this conflicts with. If so, we will find it in the next iterations
        } else if (
          o.originLeft !== null &&
          itemsBeforeOrigin.has(getItem(o.originLeft))
        ) {
          // use getItem instead of getItemCleanEnd because we don't want / need to split items.
          // case 2
          if (!conflictingItems.has(getItem(o.originLeft))) {
            left = o;
            conflictingItems.clear();
          }
        } else {
          break; // 直接break，会发生意图交叉
        }
        o = o.right;
      }
      this.left = left;
    }
    // reconnect left/right + update parent map/start if necessary
    if (this.left !== null) {
      const right = this.left.right;
      this.right = right;
      this.left.right = this;
    } else {
      let r;
      if (parentSub !== null) {
        r = parent._map.get(parentSub) || null;
        while (r !== null && r.left !== null) {
          r = r.left;
        }
      } else {
        r = parent._start;
        parent._start = this;
      }
      this.right = r;
    }
    // for map
    if (this.right !== null) {
      this.right.left = this;
    } else if (parentSub !== null) {
      // set as current parent value if right === null and this is parentSub
      parent._map.set(parentSub, this);
      if (this.left !== null) {
        // this is the current attribute value of parent. delete right
        this.left.delete();
      }
    }
    doc.addItem(this);
  }

  public fillMissing(doc: Doc) {
    if (this.originLeft !== null && this.left === null) {
      this.left = doc.getItem(this.originLeft);
    }
    if (this.originRight !== null && this.right === null) {
      this.right = doc.getItem(this.originRight);
    }
  }

  public delete() {
    this.isDeleted = true;
  }

  public getContent(): ContentAny {
    return this.content;
  }

  public getInfo(doc: Doc): ItemInfo {
    const parentKey = this.parent ? doc.findKey(this.parent) : null;
    return {
      id: this.id,
      originLeft: this.originLeft,
      originRight: this.originRight,
      parentKey,
      isDeleted: this.isDeleted,
      content: this.content,
      parentSub: this.parentSub,
    };
  }

  static fromInfo(o: ItemInfo, doc: Doc) {
    let parent = doc.get(o.parentKey);
    if (!parent) {
      // TODO: Support parent crated automatic when merged
      parent = o.parentKey ? doc.get(o.parentKey) : null;
    }
    return new Item(
      o.content,
      o.id,
      o.isDeleted,
      o.originLeft,
      o.originRight,
      null,
      null,
      parent,
      o.parentSub
    );
  }
}

export class AbstractType {
  _start: Item | null; // for array like types
  _map: Map<string, Item | undefined>; // for map like types

  public constructor() {
    this._start = null;
    this._map = new Map();
  }

  public get item() {
    return this._start;
  }

  public get items(): Item[] {
    let item = this._start;
    const items: Item[] = [];
    while (item !== null) {
      items.push(item);
      item = item.right;
    }
    return items;
  }

  public integrate(item: Item) {
    throw new Error("Method not implemented.");
  }
}

export class YArray extends AbstractType {
  length: number;
  doc: Doc;

  public constructor(doc: Doc) {
    super();
    this.length = 0;
    this.doc = doc;
  }

  public insert(index: number, content: any) {
    const doc = this.doc;
    const clock = doc.vector[doc.clientId] ?? -1;

    const left = this.findItem(index - 1);
    const right = left === null ? this._start : left.right;

    const item = new Item(
      new ContentAny([content]),
      [doc.clientId, clock + 1],
      false,
      left?.id ?? null,
      right?.id ?? null,
      left,
      right,
      this,
      null
    );
    this.integrate(item);
  }

  public delete(index: number) {
    const item = this.findItem(index);
    if (!item) {
      throw new Error("Item not found");
    }
    item.delete();
    this.length -= 1;
  }

  public get(index: number) {
    const item = this.findItem(index);
    if (!item) {
      throw new Error("Item not found");
    }
    return item.content.getLast();
  }

  public toArray(): any[] {
    let item = this._start;
    const content: any[] = [];
    while (item !== null) {
      if (!item.isDeleted) {
        content.push(item.content.getLast());
      }
      item = item.right;
    }
    return content;
  }

  public integrate(item: Item) {
    const doc = this.doc;
    const lastClock = doc.vector[item.id[0]] ?? -1;
    const clock = item.id[1];
    if (lastClock + 1 !== clock) {
      throw new Error("Clock not match");
    }
    doc.vector[item.id[0]] = clock;

    item.integrate(doc);
    if (!item.isDeleted) {
      this.length += 1;
    }
  }

  private findItem(index: number): Item | null {
    if (index < 0) {
      return null;
    }

    let j = index;
    let item: Item | null = this.item;
    while (item !== null) {
      if (item.isDeleted) {
        item = item.right;
        continue;
      }

      if (j === 0) {
        return item;
      }
      j--;
      item = item.right;
    }

    if (j > 0) {
      throw new Error("Index out of range");
    }

    return null;
  }
}

/**
 * YText is a type that represents plain text, so inhreits `YArray` could work.
 * In Yjs, YText is much complex that support rich text.
 */
export class YText extends YArray {
  public toString() {
    return this.toArray().join("");
  }
}

export class YMap extends AbstractType {
  doc: Doc;

  public constructor(doc: Doc) {
    super();
    this.doc = doc;
  }

  public get(key: string): any | null {
    const val = this._map.get(key);
    return val !== undefined && !val.isDeleted ? val.content.getLast() : null;
  }

  public set(key: string, value: any) {
    const doc = this.doc;
    const clock = doc.vector[doc.clientId] ?? -1;

    const left = this._map.get(key) ?? null;
    const item = new Item(
      new ContentAny([value]),
      [doc.clientId, clock + 1],
      false,
      left?.id ?? null,
      null,
      left,
      null,
      this,
      key
    );
    this.integrate(item);
  }

  public delete(key: string) {
    const item = this._map.get(key);
    if (item) {
      item.delete();
    }
  }

  public has(key: string): boolean {
    const val = this._map.get(key);
    return val !== undefined && !val.isDeleted;
  }

  public clear() {
    this._map.forEach((item) => {
      if (item) {
        item.delete();
      }
    });
  }

  public integrate(item: Item) {
    const doc = this.doc;
    const lastClock = doc.vector[item.id[0]] ?? -1;
    const clock = item.id[1];
    if (lastClock + 1 !== clock) {
      throw new Error("Clock not match");
    }
    doc.vector[item.id[0]] = clock;

    item.integrate(doc);
  }

  public toJSON() {
    const map: { [key: string]: any } = {};
    this._map.forEach((item, key) => {
      if (item && !item.isDeleted) {
        const v = item.content.getLast();
        map[key] = v;
      }
    });
    return map;
  }
}

export class Doc {
  share: Map<string, AbstractType>;
  vector: Vector;
  clientId: string;
  store: Map<string, Item[]>; // client id => item list

  public constructor(clientId?: string) {
    const cid = clientId ?? randomString(6);
    this.share = new Map();
    this.vector = {};
    this.clientId = cid;
    this.store = new Map();
  }

  public getText(name: string = ""): YText {
    if (!this.share.has(name)) {
      const at = new YText(this);
      this.share.set(name, at);
    }
    return this.share.get(name) as YText;
  }

  public getArray(name: string = ""): YArray {
    if (!this.share.has(name)) {
      const at = new YArray(this);
      this.share.set(name, at);
    }
    return this.share.get(name) as YArray;
  }

  public getMap(name: string = ""): YMap {
    if (!this.share.has(name)) {
      const at = new YMap(this);
      this.share.set(name, at);
    }
    return this.share.get(name) as YMap;
  }

  public get(key: string | null): AbstractType | null {
    if (key === null) {
      return null;
    }
    return this.share.get(key) as AbstractType;
  }

  public merge(src: Doc) {
    const missing: (ItemInfo | null)[] = src.getMissing(this.getVersion());
    this.applyUpdate(missing);
  }

  public applyUpdate(missing: (ItemInfo | null)[]) {
    const dest = this;
    // Include deleted items
    let remaining = missing.length;
    // Some item integrate may rely on others that not merged currently
    // so we should merge them again
    while (remaining > 0) {
      for (let i = 0; i < missing.length; i++) {
        const o = missing[i];
        const item = o === null ? null : Item.fromInfo(o, dest);
        if (item === null || !this.canInsert(item)) {
          continue;
        }
        item.fillMissing(this); // Fill missing left, right
        item.parent?.integrate(item);
        missing[i] = null;
        remaining--;
      }
    }
  }

  public getVersion() {
    return this.vector;
  }

  public getMissing(to: Vector) {
    const missing: (ItemInfo | null)[] = Array.from(this.store.values())
      .flat()
      .filter((item) => !Vector.in(item.id, to))
      .map((item) => item.getInfo(this));
    return missing;
  }

  private canInsert(item: Item) {
    const doc = this;
    // Must insert sequentially
    return (
      !Vector.in(item.id, doc.vector) &&
      (item.id[1] === 0 || // first insert item
        Vector.in([item.id[0], item.id[1] - 1], doc.vector)) && // previous item is in version
      Vector.in(item.getOriginLeft(), doc.vector) &&
      Vector.in(item.getOriginRight(), doc.vector)
    );
  }

  findKey(at: AbstractType) {
    for (const [key, value] of this.share.entries()) {
      if (value === at) {
        return key;
      }
    }
    return null;
  }

  addItem(item: Item) {
    const clientId = item.id[0];
    const list = this.store.get(clientId) ?? [];
    if (list.length > 0 && list[list.length - 1].id[1] + 1 !== item.id[1]) {
      throw new Error("Clock not match");
    }
    list.push(item);
    this.store.set(clientId, list);
  }

  getItem(id: Id | null): Item | null {
    if (id === null) {
      return null;
    }
    const items = this.store.get(id[0]);
    if (!items) {
      return null;
    }
    // TODO: binary search
    for (const item of items) {
      if (Id.compare(item.id, id)) {
        return item;
      }
    }

    return null;
  }
}
