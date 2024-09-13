import { ArrayList } from './ex10';
import assert from 'assert';

const alist = new ArrayList(1, 2);

alist.add(3);
alist.add(5, 1);
alist.removeByValue(2);
alist.add(22, 1);
alist.add(33, 1);

console.log(alist.toString());  //ArrayList(4) { 1, 33, 22, 5 }

alist.set(1, 300);
assert.strictEqual(alist.get(1), 300);
assert.strictEqual(alist.get(2), 22);
assert.strictEqual(alist.size(), 4);

assert.strictEqual(alist.indexOf(300), 1); //인덱스 1에 300
assert.strictEqual(alist.contains(300), true);  //300 존재
assert.strictEqual(alist.contains(301), false); //301은 x

assert.strictEqual(alist.isEmpty, false);  //배열에 요소가 존재 
assert.strictEqual(alist.peek, 5); //마지막 요소=5

console.log(alist.toArray());  //[1, 300, 22, 5]

assert.strictEqual(alist.iterator().next().value, 5);
alist.clear();  // 모두 제거

assert.strictEqual(alist.isEmpty, true);  //배열이 비었음
console.log('All tests passed.');
