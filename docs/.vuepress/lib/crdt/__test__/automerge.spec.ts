import { describe, expect, test } from "@jest/globals";
import { Doc, ROOT, ObjType } from "../automerge";

describe("putObject", () => {
  test("putList", () => {
    const doc = Doc.create<string>(1);
    const obj = Doc.putObject(doc, ROOT, "list", ObjType.List);
    expect(obj).toEqual("1@1");
    Doc.dump(doc);
  });

  test("putMap", () => {
    const doc = Doc.create<string>(1);
    const obj = Doc.putObject(doc, ROOT, "map", ObjType.Map);
    expect(obj).toEqual("1@1");
    Doc.dump(doc);
  });

  test("putList & putMap", () => {
    const doc = Doc.create<string>(1);
    const map = Doc.putObject(doc, ROOT, "map", ObjType.Map);
    expect(map).toEqual("1@1");
    const list = Doc.putObject(doc, ROOT, "list", ObjType.List);
    expect(list).toEqual("1@2");
    Doc.dump(doc);
  });

  test("mapPut & mapGet", () => {
    const doc = Doc.create<string>(1);
    const obj = Doc.putObject(doc, ROOT, "map", ObjType.Map);
    expect(obj).toEqual("1@1");

    const id = Doc.put(doc, obj, "a", "a");
    expect(id).toEqual("1@2");
    const id2 = Doc.put(doc, obj, "b", "b");
    expect(id2).toEqual("1@3");

    const a = Doc.get(doc, obj, "a");
    expect(a).toEqual("a");
    const b = Doc.get(doc, obj, "b");
    expect(b).toEqual("b");
    Doc.dump(doc);
  });

  test("mapPut & mapGet & mapDelete", () => {
    const doc = Doc.create<string>(1);
    const obj = Doc.putObject(doc, ROOT, "map", ObjType.Map);
    expect(obj).toEqual("1@1");

    const id = Doc.put(doc, obj, "a", "a");
    expect(id).toEqual("1@2");
    const id2 = Doc.put(doc, obj, "b", "b");
    expect(id2).toEqual("1@3");

    const a = Doc.get(doc, obj, "a");
    expect(a).toEqual("a");
    const b = Doc.get(doc, obj, "b");
    expect(b).toEqual("b");

    const id3 = Doc.delete(doc, obj, "a");
    expect(id3).toEqual("1@4");
    const a2 = Doc.get(doc, obj, "a");
    expect(a2).toEqual(null);

    const id4 = Doc.delete(doc, obj, "b");
    expect(id4).toEqual("1@5");
    const b2 = Doc.get(doc, obj, "b");
    expect(b2).toEqual(null);
    Doc.dump(doc);
  });

  test("putList & listInsert & listGet & listPut & listDelete", () => {
    const doc = Doc.create<string>(1);
    const obj = Doc.putObject(doc, ROOT, "list", ObjType.List);
    expect(obj).toEqual("1@1");

    const id = Doc.insert(doc, obj, 0, "a");
    expect(id).toEqual("1@2");
    const id2 = Doc.insert(doc, obj, 1, "b");
    expect(id2).toEqual("1@3");

    const a = Doc.get(doc, obj, 0);
    expect(a).toEqual("a");
    const b = Doc.get(doc, obj, 1);
    expect(b).toEqual("b");

    const id3 = Doc.put(doc, obj, 0, "c");
    expect(id3).toEqual("1@4");
    const c = Doc.get(doc, obj, 0);
    expect(c).toEqual("c");

    const id4 = Doc.delete(doc, obj, 0);
    expect(id4).toEqual("1@5");
    const c2 = Doc.get(doc, obj, 0);
    expect(c2).toEqual("b");
    Doc.dump(doc);
  });

  test("mapRange", () => {
    const doc = Doc.create<string>(1);
    const obj = Doc.putObject(doc, ROOT, "map", ObjType.Map);
    expect(obj).toEqual("1@1");

    const id = Doc.put(doc, obj, "a", "a");
    expect(id).toEqual("1@2");
    const id2 = Doc.put(doc, obj, "b", "b");
    expect(id2).toEqual("1@3");

    const range = Doc.range(doc, obj);
    expect(range).toEqual([
      ["a", "a"],
      ["b", "b"],
    ]);
    Doc.dump(doc);
  });

  test("listRange", () => {
    const doc = Doc.create<string>(1);
    const obj = Doc.putObject(doc, ROOT, "list", ObjType.List);
    expect(obj).toEqual("1@1");

    const id = Doc.insert(doc, obj, 0, "a");
    expect(id).toEqual("1@2");
    const id2 = Doc.insert(doc, obj, 1, "b");
    expect(id2).toEqual("1@3");

    const range = Doc.range(doc, obj);
    expect(range).toEqual(["a", "b"]);
    Doc.dump(doc);
  });
});
