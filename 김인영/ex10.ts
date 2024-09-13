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

  remove(value: T): T | undefined {
    const index = this.arr.indexOf(value);
    if (index !== -1) {
      return this.arr.splice(index, 1)[0]; // 삭제된 요소 반환
    }
    return undefined;
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

  *[Symbol.iterator]() {
    for (let i = this.length - 1; i >= 0; i -= 1) {
      yield this.toArray()[i];
    }
  }

  toArray() {
    return this.isQueue() ? this.toReversed() : this.arr;
  }

  toReversed(): T[] {
    return [...this.arr].reverse();
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

interface LinkedListNode<T> {
  value: T;
  rest: LinkedListNode<T> | null;
}

class ArrayList<T> extends Collection<T> {
  constructor(...args: T[]) {
    super(...args);
  }

  add(value: T): void;
  add(index: number, value: T): void;
  add(valueOrIndex: T | number, value?: T): void {
    if (typeof valueOrIndex === 'number' && value !== undefined) {
      this._arr.splice(valueOrIndex, 0, value);
    } else {
      this._arr.push(valueOrIndex as T);
    }
  }

  get(index: number): T | undefined {
    return this._arr[index];
  }

  remove(value: T): T | undefined {
    return super.remove(value);
  }

  removeByIndex(index: number): void {
    if (index >= 0 && index < this._arr.length) {
      this._arr.splice(index, 1);
    }
  }

  set(index: number, value: T): void {
    this._arr[index] = value;
  }

  contains(value: T): boolean {
    return this._arr.includes(value);
  }

  indexOf(value: T): number {
    return this._arr.indexOf(value);
  }

  get size(): number {
    return this._arr.length;
  }

  toArray(): T[] {
    return this._arr.slice();
  }

  get isEmpty(): boolean {
    return this._arr.length === 0;
  }

  clear(): void {
    this._arr.length = 0;
  }

  print(): void {
    console.log(this.toString());
  }

  toString(): string {
    return ArrayList.toString(this._arr);
  }

  static toString<T>(arr: T[]): string {
    const buildList = (items: T[]): string => {
      if (items.length === 0) return '';

      const [first, ...rest] = items;
      const restStr = buildList(rest);
      if (restStr === '') {
        return `{ value: ${first} }`;
      }

      return `{ value: ${first}, rest: ${restStr} }`;
    };

    return buildList(arr);
  }

  static listToArray<T>(list: LinkedListNode<T> | null): T[] {
    const result: T[] = [];
    while (list) {
      result.push(list.value);
      list = list.rest;
    }
    return result;
  }

  static arrayToList<T>(array: T[]): LinkedListNode<T> | null {
    let rest: LinkedListNode<T> | null = null;
    for (let i = array.length - 1; i >= 0; i--) {
      rest = { value: array[i], rest };
    }
    return rest;
  }
}

export { Stack, Queue, ArrayList };
