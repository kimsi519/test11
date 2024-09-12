import { ArrayList } from './ex10';
console.log('🚀  ArrayList:', ArrayList);

// const alist = new ArrayList([1, 2]); // alist.toString() ⇒ { value: 1, rest: { value: 2 } }
// alist.add(3); // { value: 1, rest: { value: 2, rest: { value: 3 } } }
// alist.add(5, 1); // { value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } }}
// // alist.remove(2); // { value: 1, rest: { value: 5, rest: { value: 3 } } }
// alist.add(22, 1); // { value: 1, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } }
// alist.add(33, 1);
// alist.toString(); // ArrayList(4) { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 5, rest: ...} } } }
// alist.set(1, 300); // { value: 1, rest: { value: 300, rest: { value: 33, rest: { ... } } } }
// alist.get(2); alist.size; // 22, 4
// alist.indexOf(300); // 1
// alist.contains(300); alist.contains(301); // true, false
// alist.isEmpty; alist.peek; // false, 3
// alist.toArray(); // [1, 300, 22, 3]
// alist.iterator().next(); // { value: 1, done: false }
// alist.clear(); // all clear