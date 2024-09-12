class Collection<T> {
  protected arr: T[] = [];

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

  //[1, 2, 3]
  *[Symbol.iterator]() {
    for (let i = this.length - 1; i >= 0; i -= 1) {
      yield this.toArray()[i];
    }
  }

  toArray() {
    return this.isQueue() ? this.arr.slice().reverse() : this.arr;
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

class ArrayList<T> extends Collection<T> {
  // 링크드 리스트 노드 타입 정의
  private list: { value: T; rest?: { value: T; rest?: any } } | undefined;

  constructor(array: T[]) {
    super();
    this.list = ArrayList.arrayToList(array);
  }

  static listToArray<T>(list: { value: T; rest?: { value: T; rest?: any } } | undefined): T[] {
    const result: T[] = [];
    let current = list;

    while (current) {
      result.push(current.value);
      current = current.rest;
    }

    return result;
  }

  static arrayToList<T>(array: T[]): { value: T; rest?: { value: T; rest?: any } } | undefined {
    if (array.length === 0) {
      throw new Error("Array cannot be empty");
    }

    let list: { value: T; rest?: { value: T; rest?: any } } = { value: array[0] };
    let current = list;

    for (let i = 1; i < array.length; i++) {
      current.rest = { value: array[i] };
      current = current.rest;
    }

    return list;
  }

  add(value: T, index: number = this.length) {
    if (index < 0 || index > this.length) {
      throw new Error("Index out of bounds");
    }

    if (index === this.length) {
      this.push(value);
    } else {
      this.list = this._addAtIndex(this.list, value, index);
    }
  }

  private _addAtIndex(list: { value: T; rest?: { value: T; rest?: any } } | undefined, value: T, index: number): { value: T; rest?: { value: T; rest?: any } } | undefined {
    if (index === 0) {
      return { value, rest: list };
    }

    if (list) {
      return { value: list.value, rest: this._addAtIndex(list.rest, value, index - 1) };
    }

    return undefined;
  }

  remove(): T | undefined {
    return this.poll;
  }

  private _removeAtIndex(list: { value: T; rest?: { value: T; rest?: any } } | undefined, index: number): { value: T; rest?: { value: T; rest?: any } } | undefined {
    if (index === 0 && list) {
      return list.rest;
    }

    if (list) {
      return { value: list.value, rest: this._removeAtIndex(list.rest, index - 1) };
    }

    return undefined;
  }

  set(index: number, value: T) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }

    this.list = this._setAtIndex(this.list, index, value);
  }

  private _setAtIndex(list: { value: T; rest?: { value: T; rest?: any } } | undefined, index: number, value: T): { value: T; rest?: { value: T; rest?: any } } | undefined {
    if (index === 0 && list) {
      return { value, rest: list.rest };
    }

    if (list) {
      return { value: list.value, rest: this._setAtIndex(list.rest, index - 1, value) };
    }

    return undefined;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }

    return this._getAtIndex(this.list, index);
  }

  private _getAtIndex(list: { value: T; rest?: { value: T; rest?: any } } | undefined, index: number): T | undefined {
    if (index === 0 && list) {
      return list.value;
    }

    if (list) {
      return this._getAtIndex(list.rest, index - 1);
    }

    return undefined;
  }

  indexOf(value: T): number {
    let index = 0;
    let current = this.list;

    while (current) {
      if (current.value === value) {
        return index;
      }
      current = current.rest;
      index++;
    }

    return -1;
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  toArray(): T[] {
    return ArrayList.listToArray(this.list);
  }

  get size() {
    return this.length;
  }

  toString(): string {
    return `ArrayList(${this.length}) ${JSON.stringify(this.list)}`;
  }
}

export { Stack, Queue, ArrayList };
