type LinkedNode<T> = {
  value: T;
  rest: LinkedNode<T> | null;
};

class Collection<T> {
  readonly arr = Array<T>();

  constructor(...args: T[]) {
    this.arr.push(...args);
  }

  get _arr() {
    return this.arr;
  }

  add(...args: T[]): T[] {
    this.arr.push(...args);
    return this.arr;
  }

  push(...args: T[]) {
    this.arr.push(...args);
    return this.arr;
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
  private _size: number = 0;

  constructor(...args: T[]) {
    super(); 
    this.arr.push(...args); 
    this._size = args.length;
  }

  add(value: T): T[];
  add(value: T, index: number): T[];
  add(value: T, index?: number): T[] {
    if (index === undefined) {
      this._size++;
      return super.add(value);
    } else {
      if (index < 0 || index > this.arr.length) {
        throw new Error("Index out of bounds");
      }
      this.arr.splice(index, 0, value);
      this._size++;
      return this.arr;
    }
  }

  remove(index: number): void {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }

    this.arr.splice(index, 1);
    this._size--;
  }

  set(index: number, value: T): void {
    if (index < 0 || index >= this._size) {
      throw new Error("Index out of bounds");
    }
    this.arr[index] = value;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this._size) {
      return undefined;
    }
    return this.arr[index];
  }

  indexOf(value: T): number {
    return this.arr.indexOf(value);
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  get size(): number {
    return this._size;
  }

  get peek(): T | undefined {
    return this.arr[this._size - 1];
  }

  toArray(): T[] {
    return [...this.arr];
  }

  clear(): void {
    this.arr.length = 0;
    this._size = 0;
  }

  *[Symbol.iterator]() {
    for (let i = 0; i < this._size; i++) {
      yield this.arr[i];
    }
  }
}



export { Stack, Queue, ArrayList };
