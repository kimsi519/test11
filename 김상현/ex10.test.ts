import assert from 'assert';
import { ArrayList } from './ex10';
console.log('🚀  ArrayList:', ArrayList);

const al = new ArrayList([1]);
al.add(2);
al.add(3); // [1, 2, 3]
al.add(4, 1); // [1, 4, 2, 3]
al.add(5, 1); // [1, 5, 4, 2, 3]
assert.deepStrictEqual(al, new ArrayList([1, 5, 4, 2, 3]));
assert.deepStrictEqual(al.toString(), {value : 1, rest : {value : 5, rest : {value : 4, rest : {value : 2, rest : {value : 3}}}}});
al.removeByIndex(2); // 인덱스가 2인 요소 = 4 -> [1, 5, 2, 3]
assert.deepStrictEqual(al.toString(), {value : 1, rest : {value : 5, rest : {value : 2, rest : {value : 3}}}});
al.set(2, 4); // 인덱스 2인 요소를 4로 수정 -> [1, 5, 4, 3]
assert.deepStrictEqual(al.toString(), {value : 1, rest : {value : 5, rest : {value : 4, rest : {value : 3}}}});
assert.deepStrictEqual(al.get(1), 5); // 인덱스가 1인 요소 = 5
assert.deepStrictEqual(al.indexOf(3), 3); // 값이 3인 요소의 인덱스 = 3
assert.deepStrictEqual(al.size(), 4); // 현재 리스트의 크기 = 4
al.newremove(5) // 값이 5인 요소 삭제 -> [1, 4, 3]
assert.deepStrictEqual(al.toString(), {value : 1, rest : {value : 4, rest : {value : 3}}});
assert.deepStrictEqual(al.contains(4), true); // 요소로 4를 가지고 있나? true
al.clear(); // 리스트 초기화
assert.deepStrictEqual(al, new ArrayList()); // 리스트가 비워짐
assert.deepStrictEqual(al.isEmpty, true); // 비어있으니까 true