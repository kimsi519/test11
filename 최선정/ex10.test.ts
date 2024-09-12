import { ArrayList } from './ex10';

console.log('🚀  ArrayList:', ArrayList);
const alist = new ArrayList<number>([1, 2]); 

console.log(alist.toString()); 

alist.add(3);
console.log(alist.toString()); 

alist.add(5, 1);
console.log(alist.toString()); 

alist.removeValue(2);
console.log(alist.toString()); 

alist.add(22, 1);
console.log(alist.toString()); 

alist.add(33, 1);
console.log(alist.toString()); 

console.log(alist.get(2)); 

console.log(alist.size()); 

console.log(alist.indexOf(300)); 
alist.set(1, 300); 
console.log(alist.indexOf(300)); 

console.log(alist.contains(300)); 
console.log(alist.contains(301)); 

console.log(alist.isEmptyList()); 

console.log(alist.peek); 

console.log(alist.toArray());

const iterator = alist.iterator();
console.log(iterator.next()); 
console.log(iterator.next()); 

alist.clear();
console.log(alist.toString());
console.log(alist.isEmptyList()); 
