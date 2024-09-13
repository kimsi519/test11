class Collection<T> {
  protected arr: T[] = [];

  constructor(args: T[]) {
    this.arr = [...args];
  }

  add(...args: T[]): T[] {
    this.arr.push(...args);
    return this.arr;
  }

  remove(value: T): T[] {
    let index;
    while ((index = this.arr.indexOf(value)) !== -1) {
      this.arr.splice(index, 1);
    }
    return this.arr;
  }

  removeByIndex(index: number): T[] {
    this.arr.splice(index, 1);
    return this.arr;
  }


  set(index: number, value: T): void {
    if (index < 0 || index >= this.arr.length) {
      throw new Error("Index out of bounds");
    }
    this.arr[index] = value;
  }

  get(index: number): T | undefined {
    if (index < 0 || index >= this.arr.length) {
      throw new Error("Index out of bounds");
    }
    return this.arr[index];
  }

  size(): number {
    return this.arr.length;
  }

  indexOf(value: T): number {
    return this.arr.indexOf(value);
  }

  contains(value: T): boolean {
    return this.arr.includes(value);
  }

  isEmpty(): boolean {
    return this.arr.length === 0;
  }

  peek(): T | undefined {
    return this.arr[this.arr.length - 1];
  }

  clear() {
    this.arr.length = 0;
    // No need to reset iterator as iteratorInstance is removed
  }

  toArray(): T[] {
    return this.isQueue() ? this.arr.reverse() : this.arr;
  }

  print() {
    console.log(`<${this.constructor.name}: [${this.toArray()}]>`);
  }

  private isQueue(): boolean {
    return this instanceof Queue;
  }

  [Symbol.iterator](): Iterator<T> {
    let index = 0;
    const data = this.arr;
    return {
      next(): IteratorResult<T> {
        if (index < data.length) {
          return { value: data[index++], done: false };
        } else {
          return { value: undefined as any, done: true };
        }
      }
    };
  }
}

class Stack<T> extends Collection<T> {}
class Queue<T> extends Collection<T> {}

class ArrayList<T> extends Collection<T> {
  constructor(args: T[]) {
    super(args);
  }

  // Overloading add method
  add(value: T): T[];
  add(value: T, index: number): T[];
  add(value: T, index?: number): T[] {
    if (index === undefined) {
      return super.add(value);
    } else {
      if (index < 0 || index > this.arr.length) {
        throw new Error("Index out of bounds");
      }
      this.arr.splice(index, 0, value);
      return this.arr;
    }
  }


  listToObject(arr: T[]): { value: T; rest?: any } | undefined {
    if (arr.length === 0) {
      return undefined;
    }
    const [head, ...tail] = arr;
    return {
      value: head,
      rest: this.listToObject(tail)
    };
  }

  toString(): string {
    const obj = this.listToObject(this.toArray());
    return JSON.stringify(obj, null, 2);
  }

  iterator(): Iterator<T> {
    return this[Symbol.iterator]();
  }
}




export { Stack, Queue, ArrayList };
