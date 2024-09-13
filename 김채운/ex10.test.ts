import { ArrayList } from './ex10';
console.log('🚀  ArrayList:', ArrayList);

const alist = new ArrayList([1, 2]); // alist.toString() ⇒ { value: 1, rest: { value: 2 } }
console.log(alist.listToArray(({ value: 1, rest: { value: 2 } })));
console.log(alist.arrayToList([1,2]));
console.log(alist.add(3));
console.log(alist.add(5, 1));
console.log(alist.indexOf(3));
console.log(alist.indexOf(900)); //존재하지 않는 값의 인덱스 검색시 -1 반환
console.log(alist.remove(2));
console.log(alist.add(22, 1));
console.log(alist.add(33, 1));
console.log(alist.toString());
console.log(alist.set(1, 300));
console.log(alist.get(2));
console.log(alist.size());
console.log(alist.contains(300));
console.log(alist.contains(301));
console.log(alist.isEmpty());
console.log(alist.peek());
console.log(alist.toArray());
console.log(alist.iterator().next());
console.log(alist.clear());
console.log(alist.isEmpty()); //true , clear이후 비어있음.
