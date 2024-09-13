import assert from "assert";
import { ArrayList, ListType } from "./ex10";

console.log("🚀  ArrayList:", ArrayList);

// 여기에 테스트코드를 작성하세요.
const list: ListType<number> = { value: 1, rest: { value: 2 } };
const arr: number[] = [1, 2];
assert.deepStrictEqual(ArrayList.listToArray(list), arr);

assert.deepStrictEqual(ArrayList.arrayToList(arr), list);

const alist = new ArrayList([1, 2]);

assert.deepStrictEqual(alist.add(3), {
  value: 1,
  rest: { value: 2, rest: { value: 3 } },
});
assert.deepStrictEqual(alist.add(5, 1), {
  value: 1,
  rest: { value: 5, rest: { value: 2, rest: { value: 3 } } },
});

assert.deepStrictEqual(alist.remove(2), {
  value: 1,
  rest: { value: 5, rest: { value: 3 } },
});

assert.deepStrictEqual(alist.add(22, 1), {
  value: 1,
  rest: { value: 22, rest: { value: 5, rest: { value: 3 } } },
});
assert.deepStrictEqual(alist.add(33, 1), {
  value: 1,
  rest: {
    value: 33,
    rest: { value: 22, rest: { value: 5, rest: { value: 3 } } },
  },
});

assert.deepStrictEqual(
  alist.toString(),
  "ArrayList(5) { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } } }"
);

assert.deepStrictEqual(alist.set(1, 300), {
  value: 1,
  rest: {
    value: 300,
    rest: { value: 22, rest: { value: 5, rest: { value: 3 } } },
  },
});

assert.strictEqual(alist.get(2), 22);

assert.strictEqual(alist.indexOf(300), 1);

assert.strictEqual(alist.contains(300), true);
assert.strictEqual(alist.contains(301), false);

assert.strictEqual(alist.size(), 5);
assert.strictEqual(alist.length, 5);

assert.strictEqual(alist.isEmpty, false);
assert.strictEqual(alist.peek, 3);

assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3]);

assert.deepStrictEqual(alist.iterator().next(), { value: 1, done: false });

assert.deepStrictEqual(alist.removeByIndex(1), {
  value: 1,
  rest: { value: 22, rest: { value: 5, rest: { value: 3 } } },
});

alist.clear();
assert.deepStrictEqual(alist.isEmpty, true);
assert.deepStrictEqual(alist.peek, undefined);

console.log("ex10 test complete!");