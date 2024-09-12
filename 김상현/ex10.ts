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
interface nodelist<T> {
  value: T;
  rest: nodelist<T> | null;
}

class ArrayList<T> {
  private list: nodelist<T> | null;

  constructor(array: T[] = []) {
      this.list = ArrayList.arrayToList(array);
  }

  private static arrayToList<T>(array: T[]): nodelist<T> | null {
      let list: nodelist<T> | null = null;
      for (let i = array.length - 1; i >= 0; i--) {
          list = { value: array[i], rest: list };
      }
      return list;
  }

  private static listToArray<T>(list: nodelist<T> | null): T[] {
      const array: T[] = [];
      while (list) {
          array.push(list.value);
          list = list.rest;
      }
      return array;
  }

  add(value: T, index: number | null = null): void {
      if (index === null || index >= this.size()) {
          this.list = { value, rest: this.list };
      } else {
          let node = this.list;
          let i = 0;
          while (i < index - 1 && node?.rest) {
              node = node.rest;
              i++;
          }
          if (node) {
              node.rest = { value, rest: node.rest };
          }
      }
  }

  remove(index: number): void {
      if (index === 0) {
          this.list = this.list?.rest ?? null;
      } else {
          let node = this.list;
          let i = 0;
          while (i < index - 1 && node?.rest) {
              node = node.rest;
              i++;
          }
          if (node?.rest) {
              node.rest = node.rest.rest;
          }
      }
  }

  get(index: number): T | undefined {
      let node = this.list;
      let i = 0;
      while (i < index && node) {
          node = node.rest;
          i++;
      }
      return node ? node.value : undefined;
  }

  set(index: number, value: T): void {
      let node = this.list;
      let i = 0;
      while (i < index && node) {
          node = node.rest;
          i++;
      }
      if (node) {
          node.value = value;
      }
  }

  size(): number {
      let node = this.list;
      let count = 0;
      while (node) {
          count++;
          node = node.rest;
      }
      return count;
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

  isEmpty(): boolean {
      return this.list === null;
  }

  peek(): T | undefined {
      return this.list ? this.list.value : undefined;
  }

  toArray(): T[] {
      return ArrayList.listToArray(this.list);
  }

  clear(): void {
      this.list = null;
  }

  *iterator(): IterableIterator<T> {
      let node = this.list;
      while (node) {
          yield node.value;
          node = node.rest;
      }
  }
}

export { Stack, Queue, ArrayList };
