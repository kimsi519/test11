class Collection<T> {
  protected readonly arr: T[] = [];

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

  *[Symbol.iterator](): IterableIterator<T> {
    for (let i = this.length - 1; i >= 0; i -= 1) {
      yield this.toArray()[i];
    }
  }

  toArray() {
    return this.isQueue() ? [...this.arr].reverse() : [...this.arr];
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
  private list: { value: T; rest: any } | null = null;

  constructor(arr: T[] = []) {
    super(...arr);
    this.list = ArrayList.arrayToList(arr);
  }

  static arrayToList(arr: any[]): any {
    if (arr.length === 0) return null;
    return { value: arr[0], rest: ArrayList.arrayToList(arr.slice(1)) };
  }

  static listToArray(list: any): any[] {
    const arr = [];
    while (list) {
      arr.push(list.value);
      list = list.rest;
    }
    return arr;
  }

  add(value: T, index?: number): void {
    if (index === undefined) {
      this.list = { value, rest: this.list };
    } else {
      this.list = this._addAtIndex(this.list, value, index);
    }
  }

  private _addAtIndex(list: any, value: T, index: number): any {
    if (index === 0) return { value, rest: list };
    return { value: list.value, rest: this._addAtIndex(list.rest, value, index - 1) };
  }

  get(index: number): T | null {
    let node = this.list;
    for (let i = 0; i < index; i++) {
      if (!node) return null;
      node = node.rest;
    }
    return node ? node.value : null;
  }

  removeValue(value: T): void {
    this.list = this._remove(this.list, value);
  }

  private _remove(list: any, value: T): any {
    if (!list) return null;
    if (list.value === value) return list.rest;
    return { value: list.value, rest: this._remove(list.rest, value) };
  }

  set(index: number, value: T): void {
    this.list = this._set(this.list, index, value);
  }

  private _set(list: any, index: number, value: T): any {
    if (!list) return null;
    if (index === 0) return { value, rest: list.rest };
    return { value: list.value, rest: this._set(list.rest, index - 1, value) };
  }

  indexOf(value: T): number {
    let node = this.list;
    let index = 0;
    while (node) {
      if (node.value === value) return index;
      node = node.rest;
      index++;
    }
    return -1;
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  size(): number {
    return ArrayList.listToArray(this.list).length;
  }

  iterator() {
    return this.toArray()[Symbol.iterator]();
  }

  toArray(): T[] {
    return ArrayList.listToArray(this.list);
  }

  isEmptyList(): boolean {
    return this.size() === 0;
  }

  clear(): void {
    this.list = null;
  }

  toString(): string {
    return JSON.stringify(this.list);
  }
}

export { Stack, Queue, ArrayList };