import { ArrayList } from "./ex10";
console.log("🚀  ArrayList:", ArrayList);

const assert = require("assert");

function runTests() {
  // Test listToArray
  assert.deepStrictEqual(
    ArrayList.listToArray({ value: 1, rest: { value: 2, rest: null } }),
    [1, 2]
  );

  // Test arrayToList
  assert.deepStrictEqual(ArrayList.arrayToList([1, 2]), {
    value: 1,
    rest: { value: 2, rest: null },
  });

  // Test ArrayList functionality
  const alist = new ArrayList<number>([1, 2]);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(2) {"value":1,"rest":{"value":2,"rest":null}}'
  );

  alist.add(3);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(3) {"value":1,"rest":{"value":2,"rest":{"value":3,"rest":null}}}'
  );

  alist.addAtIndex(5, 1);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(4) {"value":1,"rest":{"value":5,"rest":{"value":2,"rest":{"value":3,"rest":null}}}}'
  );

  alist.remove(2);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(3) {"value":1,"rest":{"value":5,"rest":{"value":3,"rest":null}}}'
  );

  alist.addAtIndex(22, 1);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(4) {"value":1,"rest":{"value":22,"rest":{"value":5,"rest":{"value":3,"rest":null}}}}'
  );

  alist.addAtIndex(33, 1);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(5) {"value":1,"rest":{"value":33,"rest":{"value":22,"rest":{"value":5,"rest":{"value":3,"rest":null}}}}}'
  );

  alist.set(1, 300);
  assert.deepStrictEqual(
    alist.toString(),
    'ArrayList(5) {"value":1,"rest":{"value":300,"rest":{"value":22,"rest":{"value":5,"rest":{"value":3,"rest":null}}}}}'
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
  //console.log("all test passed");
}

runTests();
