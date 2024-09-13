import { ArrayList } from "./ex10";
console.log("🚀  ArrayList:", ArrayList);

const assert = require("assert");

function runTests() {
  // listToArray 테스트
  assert.deepStrictEqual(ArrayList.convertListToArray({ value: 1, next: { value: 2, next: null } }), [1, 2]);

  // arrayToList 테스트
  assert.deepStrictEqual(ArrayList.convertArrayToList([1, 2]), {
    value: 1,
    next: { value: 2, next: null },
  });

  // ArrayList 기능 테스트
  const alist = new ArrayList<number>([1, 2]);
  assert.deepStrictEqual(alist.toString(), 'ArrayList(2) {"value":1,"next":{"value":2,"next":null}}');

  alist.add(3);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(3) {"value":1,"next":{"value":2,"next":{"value":3,"next":null}}}'
  );

  alist.addAtIndex(5, 1);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(4) {"value":1,"next":{"value":5,"next":{"value":2,"next":{"value":3,"next":null}}}}'
  );

  alist.remove(2);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(3) {"value":1,"next":{"value":5,"next":{"value":3,"next":null}}}'
  );

  alist.addAtIndex(22, 1);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(4) {"value":1,"next":{"value":22,"next":{"value":5,"next":{"value":3,"next":null}}}}'
  );

  alist.addAtIndex(33, 1);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(5) {"value":1,"next":{"value":33,"next":{"value":22,"next":{"value":5,"next":{"value":3,"next":null}}}}}'
  );

  alist.set(1, 300);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(5) {"value":1,"next":{"value":300,"next":{"value":22,"next":{"value":5,"next":{"value":3,"next":null}}}}}'
  );

  assert.strictEqual(alist.get(2), 22);
  assert.strictEqual(alist.getSize(), 5);

  assert.strictEqual(alist.indexOf(300), 1);
  assert.strictEqual(alist.contains(300), true);
  assert.strictEqual(alist.contains(301), false);

  assert.strictEqual(alist.isEmpty, false);
  assert.strictEqual(alist.peek, 3);

  assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3]);

  const iterator = alist.iterator();
  assert.deepStrictEqual(iterator.next(), { value: 1, done: false });

  alist.clear();
  assert.strictEqual(alist.isEmpty, true);
}

runTests();
