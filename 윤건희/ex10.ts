import { ArrayList } from './ex10';
import assert from 'assert';

const alist = new ArrayList(1, 2);
alist.add(3);
alist.add(5, 1);
alist.removeByValue(2);
alist.add(22, 1);
alist.add(33, 1);
console.log(alist.toString());  // ArrayList(4) { 1, 33, 22, 5 }

alist.set(1, 300);
assert.strictEqual(alist.get(1), 300);
assert.strictEqual(alist.get(2), 22);
assert.strictEqual(alist.size(), 4);

assert.strictEqual(alist.indexOf(300), 1);
assert.strictEqual(alist.contains(300), true);
assert.strictEqual(alist.contains(301), false);

assert.strictEqual(alist.isEmpty, false);
assert.strictEqual(alist.peek, 5);

console.log(alist.toArray());

assert.strictEqual(alist.iterator().next().value, 5);  // 이제 오류 없이 반복기에서 첫 요소를 확인 가능
alist.clear();

assert.strictEqual(alist.isEmpty, true);
console.log('All tests passed.');
