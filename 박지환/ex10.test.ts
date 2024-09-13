import * as assert from 'assert';
import { ArrayList } from './ex10';

// 테스트 실행 함수
function runTests() {
  const alist = new ArrayList<number>(1, 2);
  
  // 초기 상태 확인
  assert.strictEqual(alist.toString(), "{ value: 1, rest: { value: 2, rest: null } }");

  // 요소 추가
  alist.add(3);
  assert.strictEqual(alist.toString(), "{ value: 1, rest: { value: 2, rest: { value: 3, rest: null } } }");

  alist.add(5, 1);
  assert.strictEqual(alist.toString(), "{ value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3, rest: null } } } }");

  alist.add(33, 1);
  assert.strictEqual(alist.toString(), "{ value: 1, rest: { value: 33, rest: { value: 5, rest: { value: 2, rest: { value: 3, rest: null } } } } }");

  // 요소 수정
  alist.set(1, 300);
  assert.strictEqual(alist.toString(), "{ value: 1, rest: { value: 300, rest: { value: 5, rest: { value: 2, rest: { value: 3, rest: null } } } } }");

  // 요소 접근
  assert.strictEqual(alist.get(2), 5);
  assert.strictEqual(alist.size, 5);

  // 요소 찾기
  assert.strictEqual(alist.indexOf(300), 1);

  // 포함 여부 확인
  assert.strictEqual(alist.contains(300), true);
  assert.strictEqual(alist.contains(301), false);

  // 배열로 변환
  assert.deepStrictEqual(alist.toArray(), [1, 300, 5, 2, 3]);

  // 요소 제거
  assert.strictEqual(alist.removeByIndex(1), 300);
  assert.strictEqual(alist.toString(), "{ value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3, rest: null } } } }");

  assert.strictEqual(alist.removeByIndex(3), 3);
  assert.strictEqual(alist.toString(), "{ value: 1, rest: { value: 5, rest: { value: 2, rest: null } } }");

  // 리스트 비우기
  alist.clear();
  assert.strictEqual(alist.toString(), "null");

  console.log("All tests passed!");
}

runTests();
