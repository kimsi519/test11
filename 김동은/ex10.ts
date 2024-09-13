class Collection<T> {
  protected size: number = 0;

  // 구조를 배열로 변환
  toArray(): T[] {
    return [];
  }

  // 컬렉션의 크기를 반환
  getSize(): number {
    return this.size;
  }

  // 컬렉션을 비움
  clear() {
    this.size = 0;
  }

  // 컬렉션의 문자열 표현을 반환
  toString() {
    return `<${this.constructor.name}: [${this.toArray()}]>`;
  }
}

interface ListNode<T> {
  value: T;
  next: ListNode<T> | null;
}

class ArrayList<T> extends Collection<T> {
  private head: ListNode<T> | null = null;

  // 생성자에서 배열을 받아 리스트로 변환
  constructor(values: T[] = []) {
    super();
    this.head = values.reduceRight((next, value) => ({ value, next }), null as ListNode<T> | null);
    this.size = values.length;
  }

  // 연결 리스트를 배열로 변환
  static convertListToArray<T>(node: ListNode<T> | null): T[] {
    let arr: T[] = [];
    while (node) {
      arr.push(node.value);
      node = node.next;
    }
    return arr;
  }

  // 배열을 연결 리스트로 변환
  static convertArrayToList<T>(arr: T[]): ListNode<T> | null {
    if (arr.length === 0) return null;
    let head: ListNode<T> | null = null;
    for (let i = arr.length - 1; i >= 0; i--) {
      head = { value: arr[i], next: head };
    }
    return head;
  }

  // 리스트의 끝에 값을 추가
  add(value: T): void {
    let current = this.head;
    if (current === null) {
      this.head = { value, next: null };
    } else {
      while (current.next) {
        current = current.next;
      }
      current.next = { value, next: null };
    }
    this.size++;
  }

  // 지정한 인덱스에 값을 추가
  addAtIndex(value: T, index: number): void {
    if (index < 0 || index > this.size) throw new RangeError("Index out of bounds");

    if (index === 0) {
      this.head = { value, next: this.head };
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        if (!current) throw new Error("Invalid state");
        current = current.next;
      }
      current!.next = { value, next: current!.next };
    }
    this.size++;
  }

  // 지정한 인덱스의 값을 제거
  removeByIndex(index: number): void {
    if (index < 0 || index >= this.size) throw new RangeError("Index out of bounds");

    if (index === 0) {
      this.head = this.head?.next ?? null;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        if (!current) throw new Error("Invalid state");
        current = current.next;
      }
      current!.next = current!.next?.next ?? null;
    }
    this.size--;
  }

  // 첫 번째로 일치하는 값 제거
  remove(value: T): void {
    let current = this.head;
    let previous: ListNode<T> | null = null;

    while (current) {
      if (current.value === value) {
        if (previous) {
          previous.next = current.next;
        } else {
          this.head = current.next;
        }
        this.size--;
        return;
      }
      previous = current;
      current = current.next;
    }
  }

  // 특정 인덱스에 값 설정
  set(index: number, value: T): void {
    if (index < 0 || index >= this.size) throw new RangeError("Index out of bounds");

    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (!current) throw new Error("Invalid state");
      current = current.next;
    }
    if (current) {
      current.value = value;
    }
  }

  // 특정 인덱스의 값을 가져옴
  get(index: number): T | undefined {
    if (index < 0 || index >= this.size) throw new RangeError("Index out of bounds");

    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (!current) throw new Error("Invalid state");
      current = current.next;
    }
    return current?.value;
  }

  // 리스트에 특정 값이 포함되어 있는지 확인
  contains(value: T): boolean {
    let current = this.head;
    while (current) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  // 리스트를 배열로 변환
  toArray(): T[] {
    return ArrayList.convertListToArray(this.head);
  }

  // 특정 값의 인덱스를 찾음
  indexOf(value: T): number {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  // 마지막 값을 가져옴
  get peek(): T | undefined {
    return this.get(this.size - 1);
  }

  // 리스트가 비어있는지 확인
  get isEmpty(): boolean {
    return this.size === 0;
  }

  // 리스트를 비움
  clear(): void {
    this.head = null;
    this.size = 0;
  }

  // 리스트 내용 출력
  print(): void {
    console.log(this.toString());
  }

  // 이터레이터 반환
  iterator(): Iterator<T> {
    let current = this.head;
    return {
      next(): IteratorResult<T> {
        if (current) {
          const value = current.value;
          current = current.next;
          return { value, done: false };
        } else {
          return { value: undefined as any, done: true };
        }
      },
    };
  }

  toString() {
    return `ArrayList(${this.size}) ${JSON.stringify(this.head)}`;
  }
}

export { ArrayList };
