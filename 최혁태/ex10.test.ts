import { ArrayList } from "./ex10";
console.log("🚀 ArrayList 테스트 시작");

const alist = new ArrayList([1, 2]);
console.log("초기화 후:", alist.toString());
// 예상 출력: ArrayList(2) { value: 1, rest: { value: 2 } }

alist.add(3);
console.log("3 추가 후:", alist.toString());
// 예상 출력: ArrayList(3) { value: 1, rest: { value: 2, rest: { value: 3 } } }

alist.add(5, 1);
console.log("인덱스 1에 5 추가 후:", alist.toString());
// 예상 출력: ArrayList(4) { value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 3 } } } }

alist.remove(2);
console.log("인덱스 2 제거 후:", alist.toString());
// 예상 출력: ArrayList(3) { value: 1, rest: { value: 5, rest: { value: 3 } } }

alist.add(22, 1);
alist.add(33, 1);
console.log("22와 33을 인덱스 1에 추가 후:", alist.toString());
// 예상 출력: ArrayList(5) { value: 1, rest: { value: 33, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } } }

alist.set(1, 300);
console.log("인덱스 1을 300으로 설정 후:", alist.toString());
// 예상 출력: ArrayList(5) { value: 1, rest: { value: 300, rest: { value: 22, rest: { value: 5, rest: { value: 3 } } } } }

console.log("인덱스 2의 값:", alist.get(2), "크기:", alist.size);
// 예상 출력: 22, 5

console.log("300의 인덱스:", alist.indexOf(300));
// 예상 출력: 1

console.log(
	"300 포함 여부:",
	alist.contains(300),
	"301 포함 여부:",
	alist.contains(301)
);
// 예상 출력: true, false

console.log("비어있음:", alist.isEmpty, "마지막 요소:", alist.peek);
// 예상 출력: false, 3

console.log("배열로 변환:", alist.toArray());
// 예상 출력: [1, 300, 22, 5, 3]

console.log("iterator의 첫 번째 값:", alist.iterator().next());
// 예상 출력: { value: 1, done: false }

alist.clear();
console.log("초기화 후:", alist.toString());
// 예상 출력: ArrayList(0) null

alist.add(10);
alist.add(20, 0);
alist.add(30, 2);
console.log("경계 조건 테스트 후:", alist.toString());
// 예상 출력: ArrayList(3) { value: 20, rest: { value: 10, rest: { value: 30 } } }

console.log("유효하지 않은 인덱스 접근:", alist.get(5));
// 예상 출력: undefined

alist.remove(10);
console.log("존재하지 않는 인덱스 제거 후:", alist.toString());
// 예상 출력: ArrayList(3) { value: 20, rest: { value: 10, rest: { value: 30 } } }

console.log("🚀 ArrayList 테스트 종료");
