import assert from 'assert';
import { ArrayList } from './ex10';

async function runTests(alist: ArrayList<number>) {
  // toString test
  assert.strictEqual(alist.toString(), JSON.stringify({ value: 1, rest: { value: 2 } }, null, 2));

  // add test
  alist.add(1);
  alist.add(5, 1);
  alist.add(6, 1);
  assert.strictEqual(alist.toString(), JSON.stringify({"value":1,"rest":{"value":6,"rest":{"value":5,"rest":{"value":2,"rest":{"value":1}}}}}, null, 2));

  // removeByIndex
  alist.removeByIndex(1);
  assert.strictEqual(alist.toString(), JSON.stringify({ value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 1 } } } }, null, 2));

  // get test
  assert.strictEqual(alist.get(2), 2);

  // remove
  assert.deepStrictEqual(alist.remove(1), [5, 2]);
  assert.strictEqual(alist.toString(), JSON.stringify({ value: 5, rest: { value: 2 } }, null, 2));


  alist.add(300);
  assert.strictEqual(alist.toString(), JSON.stringify({ value: 5, rest: { value: 2, rest: { value: 300 } } }, null, 2));

  // Check various methods
  assert.strictEqual(alist.size(), 3); //size()
  assert.strictEqual(alist.indexOf(300), -1); //indexOf()
  assert.strictEqual(alist.contains(300), false); //contains()
  assert.strictEqual(alist.contains(5), true); //contains()
  assert.strictEqual(alist.isEmpty(), false); //isEmpty()
  assert.strictEqual(alist.peek(), 3); //peek()
  assert.deepStrictEqual(alist.toArray(), [5, 2, 3]); //toArray()

  // iterator test
  let iterator = alist.iterator();
  assert.deepStrictEqual(iterator.next(), { value: 5, done: false });
  assert.deepStrictEqual(iterator.next(), { value: 2, done: false });
  assert.deepStrictEqual(iterator.next(), { value: 3, done: false });
  assert.deepStrictEqual(iterator.next(), { value: undefined, done: true });

  // Clear the ArrayList
  alist.clear();
  assert.strictEqual(alist.toString(), JSON.stringify(undefined)); // Expected to be empty
}

const alist = new ArrayList([1, 2]);
// Run tests
runTests(alist).then(() => console.log('🚀 All tests passed')).catch(err => console.error('Test failed', err));
