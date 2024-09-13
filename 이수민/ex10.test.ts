import { ArrayList } from "./ex10";
import assert from "assert";
console.log("🚀  ArrayList:", ArrayList);

// 여기에 테스트코드를 작성하세요.
// ArrayList.listToArray({ value: 1, rest: { value: 2 } }); // [1, 2]
// ArrayList.arrayToList([1, 2]); // {value: 1, rest: {value: 2}}

const alist = new ArrayList([1, 2]);
assert.deepStrictEqual(alist.toString(), "{value: 1, rest: {value: 2}}");

alist.add(3);
assert.deepStrictEqual(
  alist.toString(),
  "{value: 1, rest: {value: 2, rest: {value: 3}}}"
);

alist.add(5, 1);
assert.deepStrictEqual(
  alist.toString(),
  "{value: 1, rest: {value: 5, rest: {value: 2, rest: {value: 3}}}}"
);

alist.removeAt(2); // { value: 1, rest: { value: 5, rest: { value: 3 } } }
assert.deepStrictEqual(
  alist.toString(),
  "{value: 1, rest: {value: 5, rest: {value: 3}}}"
);

alist.add(22, 1); // { value: 1, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } }
assert.deepStrictEqual(
  alist.toString(),
  "{value: 1, rest: {value: 22, rest: {value: 5, rest: {value: 3}}}}"
);

alist.add(33, 1);
assert.deepStrictEqual(
  alist.toString(),
  "{value: 1, rest: {value: 33, rest: {value: 22, rest: {value: 5, rest: {value: 3}}}}}"
);

alist.set(1, 300);
assert.deepStrictEqual(
  alist.toString(),
  "{value: 1, rest: {value: 300, rest: {value: 22, rest: {value: 5, rest: {value: 3}}}}}"
);

assert.deepStrictEqual(alist.get(2), 22);

assert.deepStrictEqual(alist.size, 5);

assert.deepStrictEqual(alist.indexOf(300), 1);

assert.deepStrictEqual(alist.contains(300), true);

assert.deepStrictEqual(alist.contains(301), false);

assert.deepStrictEqual(alist.isEmpty, false);

assert.deepStrictEqual(alist.peek, 3);

assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3]);

assert.deepStrictEqual(alist.iterator().next(), { value: 1, done: false });

alist.clear();
assert.deepStrictEqual(alist.toString(), "");
