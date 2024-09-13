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

  get poll(): T | undefined {
    return this.isQueue() ? this.arr.shift() : this.arr.pop();
  }

  get length() {
    return this.arr.length;
  }

  clear() {
    this.arr.length = 0;
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

interface MyNode<T> {
  value: T;
  rest?: MyNode<T>;
}

class ArrayList<T> extends Collection<T> {
  constructor(arr: T[] = []) {
    super(...arr);
  }

  toString(): string {
    const node = this.arrayToList(this._arr);
    return this.nodeToString(node);
  }

  private nodeToString(node?: MyNode<T>): string {
    if (!node) return "";

    const { value, rest } = node;
    return rest
      ? `{ value: ${value}, rest: ${this.nodeToString(rest)} }`
      : `{ value: ${value} }`;
  }

  arrayToList(arr: T[]): MyNode<T> | undefined {
    if (arr.length === 0) return undefined;

    const [first, ...rest] = arr;
    const node: MyNode<T> = { value: first };
    const restNode = this.arrayToList(rest);

    if (restNode) {
      node.rest = restNode;
    }

    return node;
  }

  listToArray<T>(node: MyNode<T> | undefined): T[] {
    const result: T[] = [];
    while (node) {
      result.push(node.value);
      node = node.rest;
    }
    return result;
  }

  toArray(): T[] {
    return [...this._arr];
  }

  add(value: T, index?: number): string {
    if (index === undefined) {
      this.push(value); // 인덱스가 지정되지 않은 경우, 배열의 끝에 추가
    } else {
      this._arr.splice(index, 0, value); // 지정된 인덱스에 값 추가
    }
    return this.toString(); // 추가 후 결과를 문자열로 반환
  }

  remove(value: T): string | undefined {
    let idx = this.indexOf(value);

    if (idx === -1) {
      //존재하지 않는 값을 삭제하려는 경우
      return "존재하지 않는 값입니다.";
    } else {
      this._arr.splice(idx, 1);
      return this.toString();
    }
  }

  indexOf(value: T): number {
    let cnt = 0;
    for (let v of this._arr.values()) {
      if (v === value) return cnt;
      cnt += 1;
    }
    return -1; //존재하지 않으면 -1반환
  }

  set(index: number, value: T): string {
    this._arr[index] = value;
    return this.toString();
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this.length) {
      return undefined;
    }
    return this._arr[index];
  }

  size(): number {
    return this.length;
  }

  contains(value: T): boolean {
    return this._arr.includes(value) === true;
  }

  isEmpty(): boolean {
    if (this.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  peek(): T {
    return this._arr[-1];
  }

  iterator() {
    let index = 0;
    const arr = this.toArray();
    return {
      next: () => {
        if (index < arr.length) {
          return { value: arr[index++], done: false };
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }

  clear(): string {
    this._arr.length = 0;
    return "all clear";
  }
}

export { Stack, Queue, ArrayList };
