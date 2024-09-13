import { ArrayList } from './ex10';
import assert from 'assert';

console.log('🚀  ArrayList:', ArrayList);

const alist = new ArrayList<number>(4, 7);
console.log('list:', alist.toString());

alist.add(8); // [4, 7, 8]
alist.add(15, 1); // [4, 15, 7, 8]
assert.deepStrictEqual(alist.toArray(), [4, 15, 7, 8], 'add() 실패');

alist.add(25, 2); // [4, 15, 25, 7, 8]
alist.add(40, 0); // [40, 4, 15, 25, 7, 8]
assert.deepStrictEqual(alist.toArray(), [40, 4, 15, 25, 7, 8], 'add() with index 실패');

const removedValue = alist.removeByIndex(1); // [40, 15, 25, 7, 8]
assert.strictEqual(removedValue, 4, 'removeByIndex 실패');
assert.deepStrictEqual(alist.toArray(), [40, 15, 25, 7, 8], 'removeByIndex 실패');

const removedResult = alist.removeValue(25); // [40, 15, 7, 8]
assert.strictEqual(removedResult, true, 'removeValue 실패');
assert.deepStrictEqual(alist.toArray(), [40, 15, 7, 8], 'removeValue 실패');

const failedRemove = alist.removeValue(100); // 값이 없으므로 false
assert.strictEqual(failedRemove, false, 'removeValue 실패 2');

assert.strictEqual(alist.get(0), 40, 'get() 실패');
assert.strictEqual(alist.get(2), 7, 'get() 실패');
assert.strictEqual(alist.get(10), undefined, 'get() 실패 2');

alist.set(1, 350); // [40, 350, 7, 8]
assert.deepStrictEqual(alist.toArray(), [40, 350, 7, 8], 'set() 실패');

assert.strictEqual(alist.contains(350), true, 'contains() 실패');
assert.strictEqual(alist.contains(301), false, 'contains() 실패');

assert.strictEqual(alist.indexOf(350), 1, 'indexOf() 실패');
assert.strictEqual(alist.indexOf(500), -1, 'indexOf() 실패');

assert.strictEqual(alist.size(), 4, 'size() 실패');

assert.strictEqual(alist.isEmpty, false, 'isEmpty() 실패');
alist.clear();
assert.strictEqual(alist.isEmpty, true, 'isEmpty() 실패2');

alist.add(45);
alist.add(55);
alist.add(65);
const iterator = alist.iterator();

const firstIter = iterator.next();
assert.deepStrictEqual(firstIter.value, 65, 'iterator() 1 실패');
assert.strictEqual(firstIter.done, false, 'iterator() 1 done 실패');

const secondIter = iterator.next();
assert.deepStrictEqual(secondIter.value, 55, 'iterator() 2 실패');
assert.strictEqual(secondIter.done, false, 'iterator() 2 done 실패');

const thirdIter = iterator.next();
assert.deepStrictEqual(thirdIter.value, 45, 'iterator() 3 실패');
assert.strictEqual(thirdIter.done, false, 'iterator() 3 done 실패');

const fourthIter = iterator.next();
assert.strictEqual(fourthIter.value, undefined, 'iterator() 4 실패');
assert.strictEqual(fourthIter.done, true, 'iterator() 실패');

assert.deepStrictEqual(alist.toArray(), [45, 55, 65], 'toArray() 실패');
