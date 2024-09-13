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

  remove(): T | undefined {
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

  *[Symbol.iterator]() {
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
  private head: { value: T, rest: any } | null = null;

  constructor(...args: T[]) {
    super();
    args.forEach(value => this.add(value));
  }

  add(value: T, index: number = this.size): void {
    if (index < 0 || index > this.size) throw new RangeError("Index out of bounds");

    const newNode = { value, rest: null };
    if (index === 0) {
      newNode.rest = this.head;
      this.head = newNode;
    } else {
      let prevNode = this.getNodeAt(index - 1);
      newNode.rest = prevNode.rest;
      prevNode.rest = newNode;
    }
  }

  removeByIndex(index: number): T | undefined {
    if (index < 0 || index >= this.size) throw new RangeError("Index out of bounds");

    let removedValue: T | undefined;
    if (index === 0) {
      removedValue = this.head?.value;
      this.head = this.head?.rest ?? null;
    } else {
      let prevNode = this.getNodeAt(index - 1);
      removedValue = prevNode.rest?.value;
      prevNode.rest = prevNode.rest?.rest ?? null;
    }
    return removedValue;
  }

  set(index: number, value: T): void {
    const node = this.getNodeAt(index);
    if (node) node.value = value;
  }

  get(index: number): T | undefined {
    const node = this.getNodeAt(index);
    return node ? node.value : undefined;
  }

  getNodeAt(index: number): { value: T, rest: any } | null {
    if (index < 0 || index >= this.size) throw new RangeError("Index out of bounds");
    
    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node?.rest ?? null;
    }
    return node;
  }

  indexOf(value: T): number {
    let index = 0;
    let node = this.head;
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

  get size(): number {
    let count = 0;
    let node = this.head;
    while (node) {
      count++;
      node = node.rest;
    }
    return count;
  }

  toString(): string {
    const toStringRecursively = (node: any): string => {
      return node ? `{ value: ${node.value}, rest: ${toStringRecursively(node.rest)} }` : 'null';
    };
    return toStringRecursively(this.head);
  }

  toArray(): T[] {
    const result: T[] = [];
    let node = this.head;
    while (node) {
      result.push(node.value);
      node = node.rest;
    }
    return result;
  }

  clear(): void {
    this.head = null;
  }

  *[Symbol.iterator](): Generator<T> {
    let node = this.head;
    while (node) {
      yield node.value;
      node = node.rest;
    }
  }
}

export { Stack, Queue, ArrayList };
