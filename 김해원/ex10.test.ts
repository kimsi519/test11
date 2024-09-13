import assert from "assert";
import { ArrayList } from "./ex10";
console.log("🚀  ArrayList:", ArrayList);

// 여기에 테스트코드를 작성하세요.
const alist = new ArrayList([1, 2]);
assert.deepStrictEqual(alist.print(), {
  value: 1,
  rest: { value: 2 },
});

alist.add(3);
assert.deepStrictEqual(alist.print(), {
  value: 1,
  rest: { value: 2, rest: { value: 3 } },
});

alist.add(5, 1);
assert.deepStrictEqual(alist.print(), {
  value: 1,
  rest: { value: 5, rest: { value: 2, rest: { value: 3 } } },
});

alist.remove(1);
assert.deepStrictEqual(alist.print(), {
  value: 5,
  rest: { value: 2, rest: { value: 3 } },
});

alist.removeByIndex(1);
assert.deepStrictEqual(alist.print(), {
  value: 5,
  rest: { value: 3 },
});

alist.add(22, 1);
assert.deepStrictEqual(alist.print(), {
  value: 5,
  rest: { value: 22, rest: { value: 3 } },
});

alist.add(33, 1);
assert.deepStrictEqual(alist.print(), {
  value: 5,
  rest: { value: 33, rest: { value: 22, rest: { value: 3 } } },
});

alist.set(1, 300);
assert.deepStrictEqual(alist.print(), {
  value: 5,
  rest: { value: 300, rest: { value: 22, rest: { value: 3 } } },
});

assert.strictEqual(alist.get(2), 22);
assert.strictEqual(alist.size(), 4);
assert.strictEqual(alist.indexOf(300), 1);
assert.strictEqual(alist.contains(300), true);
assert.strictEqual(alist.contains(301), false);
assert.strictEqual(alist.isEmpty(), false);

assert.strictEqual(alist.peek(), 5);

assert.strictEqual(
  alist.toString(),
  '{"value":5,"rest":{"value":300,"rest":{"value":22,"rest":{"value":3}}}}'
);

assert.deepStrictEqual(alist.toArray(), [5, 300, 22, 3]);

assert.deepStrictEqual(alist.iterator().next(), { value: 5, done: false });

alist.clear();
assert.strictEqual(alist.print(), undefined);
