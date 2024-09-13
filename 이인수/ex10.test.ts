import assert from 'assert';
import { ArrayList, Collection } from './ex10';

// 여기에 테스트코드를 작성하세요.
const alist = new ArrayList([1, 2]);
assert.deepStrictEqual(
  alist.toString(),
  '{ value: 1, rest: { value: 2, rest: null } }'
);

alist.add(3);
assert.deepStrictEqual(
  alist.toString(),
  '{ value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }'
);
alist.add(5, 1);
assert.deepStrictEqual(
  alist.toString(),
  '{ value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3, rest: null } } } }'
);
alist.remove(2);
assert.deepStrictEqual(
  alist.toString(),
  '{ value: 1, rest: { value: 5, rest: { value: 3, rest: null } } }'
);
alist.add(22, 1);
assert.deepStrictEqual(
  alist.toString(),
  '{ value: 1, rest: { value: 22, rest: { value: 5, rest: { value: 3, rest: null } } } }'
);
alist.add(33, 1);
assert.deepStrictEqual(
  alist.toString(),
  '{ value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 5, rest: { value: 3, rest: null } } } } }'
);
alist.set(1, 300);
assert.deepStrictEqual(
  alist.toString(),
  '{ value: 1, rest: { value: 300, rest: { value: 22, rest: { value: 5, rest: { value: 3, rest: null } } } } }'
);
assert.deepStrictEqual(alist.get(2), 22);
assert.deepStrictEqual(alist.size(), 5);
assert.deepStrictEqual(alist.indexOf(300), 1);
assert.deepStrictEqual(alist.indexOf(301), -1);
assert.deepStrictEqual(alist.contains(300), true);
assert.deepStrictEqual(alist.contains(301), false);
assert.deepStrictEqual(alist.isEmpty(), false);
assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3]);
assert.deepStrictEqual(alist.peek(), 1);

const iterator = alist[Symbol.iterator]();
assert.deepStrictEqual(iterator.next(), { value: 1, done: false });
assert.deepStrictEqual(iterator.next(), { value: 300, done: false });
assert.deepStrictEqual(iterator.next(), { value: 22, done: false });
assert.deepStrictEqual(iterator.next(), { value: 5, done: false });
assert.deepStrictEqual(iterator.next(), { value: 3, done: false });
assert.deepStrictEqual(iterator.next(), { value: undefined, done: true });

alist.clear();
assert.deepStrictEqual(alist.size(), 0);

assert.deepStrictEqual(
  ArrayList.listToArray({ value: 1, rest: { value: 2, rest: null } }),
  [1, 2]
);
assert.deepStrictEqual(ArrayList.arrayToList([1, 2]), {
  value: 1,
  rest: { value: 2, rest: null },
});
