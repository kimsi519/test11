import { ArrayList } from './ex10';
import assert from 'assert';
console.log('🚀  ArrayList:', ArrayList);

// 여기에 테스트코드를 작성하세요.
// instance
const arrLst = new ArrayList([1])
assert.deepStrictEqual(arrLst.toArray(), [1]);
assert.deepStrictEqual(arrLst.size(), 1);
assert.deepStrictEqual(arrLst.add(3), {value: 1, rest: {value: 3}});
assert.deepStrictEqual(arrLst.add(2,1), {value: 1, rest: {value: 2, rest: {value: 3}}});
assert.deepStrictEqual(arrLst.peek(), 3);
assert.deepStrictEqual(arrLst.get(1), 2);
assert.deepStrictEqual(arrLst.indexOf(2), 1);
assert.deepStrictEqual(arrLst.remove(1), {value: 2, rest: {value: 3}});
assert.deepStrictEqual(arrLst.removeByIndex(0), {value: 3});
assert.deepStrictEqual(arrLst.contains(3), true);
assert.deepStrictEqual(arrLst.contains(1), false);
assert.deepStrictEqual(arrLst.set(0, 1), {value: 1});
assert.deepStrictEqual(arrLst.add(3), {value: 1, rest: {value: 3}});
assert.deepStrictEqual(arrLst.iterator().next(), {value: 1, done: false});
assert.deepStrictEqual(arrLst.toArray(), [1,3]);
assert.deepStrictEqual(arrLst.toString(), '{ value: 1, rest: { value: 3, rest: no more } }');
assert.deepStrictEqual(arrLst.isEmpty(), false);
arrLst.clear()
assert.deepStrictEqual(arrLst.isEmpty(), true);
// static
assert.deepStrictEqual(ArrayList.listToArray({ value: 1, rest: { value: 2, rest: { value: 3 } } }), [ 1, 2, 3 ]);
assert.deepStrictEqual(ArrayList.arrayToList([1,2,3,]), { value: 1, rest: { value: 2, rest: { value: 3 } } });