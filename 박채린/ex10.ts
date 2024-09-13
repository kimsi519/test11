class Collection<T> {
  private readonly arr: T[] = [];

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
      yield this.arr[i];
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

class ArrayList<T> extends Collection<T> {
  constructor(items: T[] = []) {
    super(...items);
  }

  static listToArray(list: { value: number; rest?: any }): number[] {
    const array: number[] = [];
    let current: any = list;
    while (current) {
      array.push(current.value);
      current = current.rest;
    }
    return array;
  }

  static arrayToList(array: number[]): { value: number; rest?: any } {
    const reversed = array.reverse();
    let list: any = null;
    for (const value of reversed) {
      list = { value, rest: list };
    }
    return list;
  }

  add(value: T, index?: number): void {
    if (index !== undefined) {
      this._arr.splice(index, 0, value);
    } else {
      this._arr.push(value);
    }
  }

  remove(value: T): void {
    const index = this._arr.indexOf(value);
    if (index !== -1) {
      this._arr.splice(index, 1);
    }
  }

  set(index: number, value: T): void {
    if (index >= 0 && index < this.length) {
      this._arr[index] = value;
    }
  }

  get(index: number): T | undefined {
    return this._arr[index];
  }

  indexOf(value: T): number {
    return this._arr.indexOf(value);
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  toString(): string {
    return JSON.stringify(this.toArray(), null, 2);
  }

  toArray(): T[] {
    return this._arr;
  }
}

export { Stack, Queue, ArrayList };
