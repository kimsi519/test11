import { ArrayList } from './ex10';
import assert from 'assert';

console.log('Running ArrayList ex10 Tests');

// 1. ArrayList.listToArray({ value: 1, rest: { value: 2 } }) ⇒ [1, 2]
const list = { value: 1, rest: { value: 2, rest: null } };
assert.deepStrictEqual(ArrayList.listToArray(list), [1, 2], 'listToArray failed');

// 2. ArrayList.arrayToList([1, 2]) ⇒ { value: 1, rest: { value: 2 } }
const array = [1, 2];
assert.deepStrictEqual(ArrayList.arrayToList(array), list, 'arrayToList failed');

// 3. const alist = new ArrayList([1, 2]); alist.toString() ⇒ { value: 1, rest: { value: 2 } }
const alist = new ArrayList([1, 2]);
assert.strictEqual(alist.toString(), 'value: 1, rest: { value: 2 }', 'alist.toString() failed');

// 4. alist.add(3); ⇒ { value: 1, rest: { value: 2, rest: { value: 3 } } }
alist.add(3);
assert.strictEqual(alist.toString(), 'value: 1, rest: { value: 2, rest: { value: 3 } }', 'alist.add(3) failed');

// 5. alist.add(5, 1); ⇒ { value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } } } }
alist.add(5, 1);
assert.strictEqual(alist.toString(), 'value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } } }', 'alist.add(5, 1) failed');

// 6. alist.remove(2); ⇒ { value: 1, rest: { value: 5, rest: { value: 3 } } }
alist.remove(2);
assert.strictEqual(alist.toString(), 'value: 1, rest: { value: 5, rest: { value: 3 } }', 'alist.remove(2) failed');

// 7. alist.add(22, 1); ⇒ { value: 1, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } }
alist.add(22, 1);
assert.strictEqual(alist.toString(), 'value: 1, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } }', 'alist.add(22, 1) failed');

// 8. alist.add(33, 1); ⇒ { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } } }
alist.add(33, 1);
assert.strictEqual(alist.toString(), 'value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } }', 'alist.add(33, 1) failed');

// 9. alist.set(1, 300); ⇒ { value: 1, rest: { value: 300, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } } }
alist.set(1, 300);
assert.strictEqual(alist.toString(), 'value: 1, rest: { value: 300, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } }', 'alist.set(1, 300) failed');

// 10. alist.get(2) ⇒ 22
assert.strictEqual(alist.get(2), 22, 'alist.get(2) failed');

// 11. alist.indexOf(300) ⇒ 1
assert.strictEqual(alist.indexOf(300), 1, 'alist.indexOf(300) failed');

// 12. alist.contains(300) ⇒ true, alist.contains(301) ⇒ false
assert.strictEqual(alist.contains(300), true, 'alist.contains(300) failed');
assert.strictEqual(alist.contains(301), false, 'alist.contains(301) failed');

// 13. alist.isEmpty ⇒ false
assert.strictEqual(alist.isEmpty, false, 'alist.isEmpty failed');

// 14. alist.peek ⇒ 3
assert.strictEqual(alist.peek, 3, 'alist.peek failed');

// 15. alist.toArray() ⇒ [1, 300, 22, 5, 3]
assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3], 'alist.toArray() failed');

// 16. alist.iterator().next() ⇒ { value: 1, done: false }
assert.deepStrictEqual(alist.iterator().next(), { value: 3, done: false }, 'alist.iterator().next() failed');

// 17. alist.clear()
alist.clear();
assert.deepStrictEqual(alist.length, 0, 'alist.clear() failed');

console.log('All tests passed successfully!');