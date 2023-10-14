import { describe, expect, test } from "@jest/globals";
import { Doc } from "../tinyyjs";

describe("YText basics", () => {
  test("insert 1,2,3", () => {
    const doc = new Doc("a");
    const text = doc.getText();
    text.insert(0, "1");
    text.insert(1, "2");
    let content = text.toArray();
    expect(content.join("")).toBe("12");
    text.insert(2, "3");
    content = text.toArray();
    expect(content.join("")).toBe("123");
  });

  test("insert 1,2,3; delete 0,0", () => {
    const doc = new Doc("a");
    const text = doc.getText();
    text.insert(0, "1");
    text.insert(1, "2");
    text.insert(2, "3");
    let content = text.toArray();
    expect(content.join("")).toBe("123");

    text.delete(0);
    content = text.toArray();
    expect(content.join("")).toBe("23");
    text.delete(0);
    text.delete(0);
    content = text.toArray();
    expect(content.join("")).toBe("");
  });
});

describe("YText merge", () => {
  test("merge doc1 => doc2", () => {
    const doc1 = new Doc("a");
    const text1 = doc1.getText();
    text1.insert(0, "1");
    text1.insert(1, "2");
    let content = text1.toArray();
    expect(content.join("")).toBe("12");

    const doc2 = new Doc("b");
    const text2 = doc2.getText();
    text2.insert(0, "3");
    text2.insert(1, "4");
    content = text2.toArray();
    expect(content.join("")).toBe("34");

    doc2.merge(doc1);
    content = text1.toArray();
    expect(content.join("")).toBe("12");
    content = text2.toArray();
    expect(content.join("")).toBe("1234");
    doc2.merge(doc1);
    content = text2.toArray();
    expect(content.join("")).toBe("1234");
  });

  test("merge doc1, doc2 => doc3", () => {
    const doc1 = new Doc("a");
    const text1 = doc1.getText();
    text1.insert(0, "1");
    text1.insert(1, "2");
    text1.insert(2, "3");
    let content = text1.toArray();
    expect(content.join("")).toBe("123");

    const doc2 = new Doc("b");
    const text2 = doc2.getText();
    text2.insert(0, "3");
    text2.insert(1, "4");
    content = text2.toArray();
    expect(content.join("")).toBe("34");

    doc2.merge(doc1);
    content = text1.toArray();
    expect(content.join("")).toBe("123");
    content = text2.toArray();
    expect(content.join("")).toBe("12334");

    const doc3 = new Doc("c");
    const text3 = doc3.getText();
    text3.insert(0, "5");
    text3.insert(1, "6");
    content = text3.toArray();
    expect(content.join("")).toBe("56");
    doc2.merge(doc3);
    content = text2.toArray();
    expect(content.join("")).toBe("1233456");
  });

  test("merge doc1 <=> doc2", () => {
    const doc1 = new Doc("a");
    const text1 = doc1.getText();
    text1.insert(0, "1");
    text1.insert(1, "2");
    let content = text1.toArray();
    expect(content.join("")).toBe("12");

    const doc2 = new Doc("b");
    const text2 = doc2.getText();
    text2.insert(0, "3");
    text2.insert(1, "4");
    content = text2.toArray();
    expect(content.join("")).toBe("34");

    doc2.merge(doc1);
    content = text1.toArray();
    expect(content.join("")).toBe("12");
    content = text2.toArray();
    expect(content.join("")).toBe("1234");
    doc1.merge(doc2);
    content = text1.toArray();
    expect(content.join("")).toBe("1234");
  });

  test("merge doc1 <=> doc2 at same origin", () => {
    const doc1 = new Doc("a");
    const text1 = doc1.getText();
    text1.insert(0, "1");
    text1.insert(1, "2");
    let content = text1.toArray();
    expect(content.join("")).toBe("12");

    const doc2 = new Doc("b");
    const text2 = doc2.getText();
    doc2.merge(doc1);
    content = text2.toArray();
    expect(content.join("")).toBe("12");

    text1.insert(1, "a");
    content = text1.toArray();
    expect(content.join("")).toBe("1a2");
    text2.insert(1, "b");
    content = text2.toArray();
    expect(content.join("")).toBe("1b2");

    doc2.merge(doc1);
    content = text2.toArray();
    expect(content.join("")).toBe("1ab2");

    doc1.merge(doc2);
    content = text1.toArray();
    expect(content.join("")).toBe("1ab2");
  });
});

describe("YArray basics", () => {
  test("insert 1,2,3", () => {
    const doc = new Doc("a");
    const text = doc.getText();
    text.insert(0, 1);
    text.insert(1, 2);
    let content = text.toArray();
    expect(content).toStrictEqual([1, 2]);
    text.insert(2, 3);
    content = text.toArray();
    expect(content).toStrictEqual([1, 2, 3]);
  });

  test("insert 1,2,3; delete 0,0", () => {
    const doc = new Doc("a");
    const text = doc.getText();
    text.insert(0, 1);
    text.insert(1, 2);
    text.insert(2, 3);
    let content = text.toArray();
    expect(content).toStrictEqual([1, 2, 3]);

    text.delete(0);
    content = text.toArray();
    expect(content).toStrictEqual([2, 3]);
    text.delete(0);
    text.delete(0);
    content = text.toArray();
    expect(content).toStrictEqual([]);
  });
});

describe("YMap basics", () => {
  test("put a,b,c; delete a,b,c", () => {
    const doc = new Doc("a");
    const map = doc.getMap("map");
    map.set("a", "a");
    map.set("b", "b");
    map.set("c", "c");
    let content = map.toJSON();
    expect(content).toStrictEqual({
      a: "a",
      b: "b",
      c: "c",
    });
    expect(map.get("a")).toBe("a");
    expect(map.get("b")).toBe("b");
    expect(map.get("c")).toBe("c");

    map.delete("a");
    content = map.toJSON();
    expect(content).toStrictEqual({
      b: "b",
      c: "c",
    });
    map.delete("b");
    map.delete("c");
    content = map.toJSON();
    expect(content).toStrictEqual({});

    map.set("a", "aa");
    content = map.toJSON();
    expect(content).toStrictEqual({
      a: "aa",
    });
  });

  test("put a,a,b,b", () => {
    const doc = new Doc("a");
    const map = doc.getMap("map");
    map.set("a", "a");
    map.set("a", "aa");
    map.set("b", "b");
    map.set("b", "bb");
    let content = map.toJSON();
    expect(content).toStrictEqual({
      a: "aa",
      b: "bb",
    });
    expect(map.get("a")).toBe("aa");
    expect(map.get("b")).toBe("bb");

    map.delete("a");
    content = map.toJSON();
    expect(content).toStrictEqual({
      b: "bb",
    });
    map.delete("b");
    content = map.toJSON();
    expect(content).toStrictEqual({});
  });
});

describe("YMap merge", () => {
  test("merge a,b", () => {
    const doc = new Doc("a");
    const map = doc.getMap("map");
    map.set("a", "aa");
    map.set("b", "bb");
    let content = map.toJSON();
    expect(content).toStrictEqual({
      a: "aa",
      b: "bb",
    });
    expect(map.get("a")).toBe("aa");
    expect(map.get("b")).toBe("bb");

    const doc2 = new Doc("b");
    const map2 = doc2.getMap("map");
    map2.set("a", "aaa");
    map2.set("b", "bbb");
    map2.set("c", "ccc");
    content = map2.toJSON();
    expect(content).toStrictEqual({
      a: "aaa",
      b: "bbb",
      c: "ccc",
    });

    doc2.merge(doc);
    content = map2.toJSON();
    expect(content).toStrictEqual({
      a: "aaa",
      b: "bbb",
      c: "ccc",
    });
  });
});

describe("MulTypes", () => {
  test("YArray & YMap basics", () => {
    const doc = new Doc("a");
    const map = doc.getMap("map");
    map.set("a", "a");
    map.set("b", "b");
    map.set("c", "c");
    let content = map.toJSON();
    expect(content).toStrictEqual({
      a: "a",
      b: "b",
      c: "c",
    });
    expect(map.get("a")).toBe("a");
    expect(map.get("b")).toBe("b");
    expect(map.get("c")).toBe("c");

    const array = doc.getArray("array");
    array.insert(0, 1);
    array.insert(1, 2);
    array.insert(2, 3);
    let arr = array.toArray();
    expect(arr).toStrictEqual([1, 2, 3]);
    expect(array.get(0)).toStrictEqual(1);
    expect(array.get(1)).toStrictEqual(2);
    expect(array.get(2)).toStrictEqual(3);
  });

  test("YArray & YMap merge", () => {
    const doc = new Doc("a");
    const map = doc.getMap("map");
    map.set("a", "a");
    map.set("b", "b");
    map.set("c", "c");
    let content = map.toJSON();
    expect(content).toStrictEqual({
      a: "a",
      b: "b",
      c: "c",
    });
    const array = doc.getArray("array");
    array.insert(0, 1);
    array.insert(1, 2);
    array.insert(2, 3);
    let arr = array.toArray();
    expect(arr).toStrictEqual([1, 2, 3]);

    const doc2 = new Doc("b");
    const map2 = doc2.getMap("map");
    const array2 = doc2.getArray("array");
    doc2.merge(doc);

    arr = array2.toArray();
    expect(arr).toStrictEqual([1, 2, 3]);
    content = map2.toJSON();
    expect(content).toStrictEqual({
      a: "a",
      b: "b",
      c: "c",
    });

    map2.set("a", "aa");
    content = map2.toJSON();
    expect(content).toStrictEqual({
      a: "aa",
      b: "b",
      c: "c",
    });
  });
});

describe("ApplyUpdate", () => {
  test("YArray & YMap applyUpdate", () => {
    const doc = new Doc("a");
    const map = doc.getMap("map");
    map.set("a", "a");
    map.set("b", "b");
    map.set("c", "c");
    let content = map.toJSON();
    expect(content).toStrictEqual({
      a: "a",
      b: "b",
      c: "c",
    });
    const array = doc.getArray("array");
    array.insert(0, 1);
    array.insert(1, 2);
    array.insert(2, 3);
    let arr = array.toArray();
    expect(arr).toStrictEqual([1, 2, 3]);

    const doc2 = new Doc("b");
    const map2 = doc2.getMap("map");
    const array2 = doc2.getArray("array");

    const missing = doc.getMissing(doc2.getVersion());
    doc2.applyUpdate(missing);

    arr = array2.toArray();
    expect(arr).toStrictEqual([1, 2, 3]);
    content = map2.toJSON();
    expect(content).toStrictEqual({
      a: "a",
      b: "b",
      c: "c",
    });

    map2.set("a", "aa");
    content = map2.toJSON();
    expect(content).toStrictEqual({
      a: "aa",
      b: "b",
      c: "c",
    });
  });
});
