class Collection<T> {
  private readonly arr = Array<T>();

  constructor(...args: T[]) {
    this.arr.push(...args);
  }

  get _arr() {
    return this.arr;
  }

  push(...args: T[]) {
    this.arr.push(...args);
    return this.arr;
  }

  get peek(): T | undefined {
    return this.isQueue() ? this.arr[0] : this.arr.at(-1);
  }

  get poll(): T | undefined {
    return this.isQueue() ? this.arr.shift() : this.arr.pop();
  }

  remove() {
    return this.poll;
  }

  get length() {
    return this.arr.length;
  }

  get isEmpty() {
    return !this.arr.length;
  }

  clear() {
    this.arr.length = 0;
  }

  iterator() {
    return this[Symbol.iterator]();
  }

  // [1, 2, 3]
  *[Symbol.iterator]() {
    for (let i = this.length - 1; i >= 0; i -= 1) {
      yield this.toArray()[i];
    }
  }

  toArray() {
    return this.isQueue() ? this.arr.toReversed() : this.arr;
  }

  print() {
    console.log(`<${this.constructor.name}: [${this.toArray()}]>`);
  }

  private isQueue() {
    return this instanceof Queue;
  }
}

class Stack<T> extends Collection<T> {}
class Queue<T> extends Collection<T> {}

// ArrayList 클래스를 작성하세요.
class ArrayList<T> extends Collection<T> {
  // head: 리스트의 첫번째 노드
  private head: ListNode<T> | null = null;

  // 생성자: 초기값 전달
  constructor(elements: T[] = []) {
    super();
    // 배열의 요소 하나씩 추가
    for (const element of elements) {
      this.add(element);
    }
  }

  // 요소를 추가(특정 인덱스 또는 마지막에)
  add(element: T, index?: number): void {
    // 인덱스가 지정되어 있지 않다면 마지막에 추가
    if (index === undefined || index === this.size) {
      this.addLast(element);
    } else if (index === 0) {
      // 인덱스가 0일 경우 head 업데이트
      this.head = new ListNode(element, this.head);
    } else {
      // 특정 인덱스에 노드 삽입
      let current = this.head; // 특정 노드 직전까지 탐색
      for (let i = 0; i < index - 1 && current; i++) {
        current = current.next;
      }
      if (current) {
        // 삽입
        current.next = new ListNode(element, current.next);
      }
    }
    // 배열에도 요소 추가
    this.push(element);
  }

  // 리스트의 끝에 요소를 추가하는 private 함수
  private addLast(element: T): void {
    // 리스트가 비어 있으면 head에 새로운 ListNode 할당
    if (!this.head) {
      this.head = new ListNode(element);
    } else {
      // 그렇지 않으면 마지막 ListNode를 찾아 새 ListNode 연결
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = new ListNode(element);
    }
  }

  // 특정 인덱스에서 요소를 제거하고 반환
  removeAt(index: number): T | undefined {
    // 유효하지 않은 인덱스 -> undefined
    if (index < 0 || index >= this.size) {
      return undefined;
    }
    let removedElement: T;
    // 인덱스가 0이면 head 제거, 다음 ListNode를 head로 설정
    if (index === 0) {
      removedElement = this.head!.value;
      this.head = this.head!.next;
    } else {
      // 인덱스 직전까지 탐색하고 ListNode 제거
      let current = this.head;
      for (let i = 0; i < index - 1 && current; i++) {
        current = current.next;
      }
      if (current && current.next) {
        removedElement = current.next.value;
        current.next = current.next.next;
      } else {
        return undefined;
      }
    }
    // 배열에서도 요소 제거
    this._arr.splice(index, 1);
    return removedElement;
  }

  // 특정 인덱스의 요소 변경
  set(index: number, element: T): void {
    if (index < 0 || index >= this.size) {
      throw new Error("Index out of bounds");
    }
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    if (current) {
      current.value = element;
      this._arr[index] = element;
    }
  }

  // 특정 인덱스의 요소 반환
  get(index: number): T | undefined {
    if (index < 0 || index >= this.size) {
      return undefined;
    }
    let current = this.head;
    for (let i = 0; i < index && current; i++) {
      current = current.next;
    }
    return current ? current.value : undefined;
  }

  // 리스트의 크기 반환
  get size(): number {
    return this.length;
  }

  // 리스트의 마지막 요소 반환
  get peek(): T | undefined {
    return this.get(this.size - 1);
  }

  // 특정 요소의 인덱스를 반환. 존재하지 않으면 -1 반환
  indexOf(element: T): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === element) {
        return index;
      }
      current = current.next;
      index++;
    }
    return -1;
  }

  // 요소가 리스트에 존재하는지 확인
  contains(element: T): boolean {
    return this.indexOf(element) !== -1;
  }

  // 리스트를 문자열로 변환
  toString(): string {
    let result = "";
    let current = this.head;
    // 리스트를 순회하면서 문자열로 변환
    while (current) {
      result += `{value: ${current.value}${current.next ? ", rest: " : ""}`;
      current = current.next;
    }
    result += "}".repeat(this.size);
    return result;
  }

  // 리스트를 배열로 변환
  toArray(): T[] {
    return Array.from(this);
  }

  // 리스트를 순회하는 이터레이터 생성
  *[Symbol.iterator](): Generator<T, void, unknown> {
    let current = this.head;
    // 노드를 순회하면서 값 반환
    while (current) {
      yield current.value;
      current = current.next;
    }
  }

  // 리스트 초기화
  clear(): void {
    super.clear();
    this.head = null;
  }
}

// ListNode: 리스트의 각 노드
class ListNode<T> {
  constructor(
    public value: T, // 값
    public next: ListNode<T> | null = null // 다음 노드 포인터
  ) {}
}
export { Stack, Queue, ArrayList };
