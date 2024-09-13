import { ArrayList } from './ex10';
console.log('🚀  ArrayList:', ArrayList);
import * as assert from 'assert';

// 여기에 테스트코드
function testArrayList() {
  const alist = new ArrayList<number>([1, 2]);

  assert.deepStrictEqual(ArrayList.listToArray({ value: 1, rest: { value: 2, rest: null } }), [1, 2]);
  assert.deepStrictEqual(ArrayList.arrayToList([1, 2]), { value: 1, rest: { value: 2, rest: null } });
  
  alist.add(3);
  assert.deepStrictEqual(alist.toString(), '{ value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }');
  
  alist.add(5, 1);
  assert.deepStrictEqual(alist.toString(), '{ value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3, rest: null } } } }');
  
  alist.remove(2);
  assert.deepStrictEqual(alist.toString(), '{ value: 1, rest: { value: 5, rest: { value: 3, rest: null } } }');
  
  alist.add(22, 1);
  assert.deepStrictEqual(alist.toString(), '{ value: 1, rest: { value: 22, rest: { value: 5, rest: { value: 3, rest: null } } } }');
  
  alist.add(33, 1);
  assert.deepStrictEqual(alist.toArray(), [1, 33, 22, 5, 3]);

  assert.deepStrictEqual(alist.toString(), '{ value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 5, rest: { value: 3, rest: null } } } } }');
  
  alist.set(1, 300);
  alist.get(2);

  assert.strictEqual(alist.get(2), 22);
  assert.strictEqual(alist.size(), 5);
  assert.strictEqual(alist.indexOf(300), 1);
  assert.strictEqual(alist.contains(300), true);
  assert.strictEqual(alist.contains(301), false);
  assert.strictEqual(alist.isEmpty(), false);
  assert.strictEqual(alist.peek(), 1);
  
  assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3]);
  
  const iterator = alist[Symbol.iterator]();
  assert.deepStrictEqual(iterator.next(), { value: 1, done: false });
  assert.deepStrictEqual(iterator.next(), { value: 300, done: false });
  assert.deepStrictEqual(iterator.next(), { value: 22, done: false });
  assert.deepStrictEqual(iterator.next(), { value: 5, done: false });
  assert.deepStrictEqual(iterator.next(), { value: 3, done: false });
  assert.deepStrictEqual(iterator.next(), { value: undefined, done: true });

  alist.clear();
  assert.deepStrictEqual(alist.size(), 0);
}

testArrayList();