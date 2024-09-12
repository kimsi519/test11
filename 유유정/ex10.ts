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
  add(value: T, index?: number): void {
    if (index === undefined) {
      this.push(value);
    } else {
      if (index < 0 || index > this.length) {
        throw new Error("Index out of bounds");
      }
      this._arr.splice(index, 0, value);
    }
  }

  get(index: number): T {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }
    return this._arr[index];
  }

  // remove(value: T): boolean {
  //   const index = this.indexOf(value);
  //   if (index !== -1) {
  //     this.removeByIndex(index);
  //     return true;
  //   }
  //   return false;
  // }

  removeByIndex(index: number): void {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }
    this._arr.splice(index, 1);
  }

  set(index: number, value: T): void {
    if (index < 0 || index >= this.length) {
      throw new Error("Index out of bounds");
    }
    this._arr[index] = value;
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  indexOf(value: T): number {
    return this._arr.indexOf(value);
  }

  size(): number {
    return this.length;
  }

  toString(): string {
    return `<ArrayList: [${this.toArray()}]>`;
  }
}

export { Stack, Queue, ArrayList };
