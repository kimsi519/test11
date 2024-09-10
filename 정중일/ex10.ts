type ListType<T> = {
  value: T;
  rest?: ListType<T>;
};
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

  get length() {
    return this.arr.length;
  }

  get isEmpty() {
    return !this.arr.length;
  }

  clear() {
    this.arr.length = 0;
  }

  // iterator() {
  //   return this[Symbol.iterator]();
  // }

  // [1, 2, 3]
  // *[Symbol.iterator]() {
  //   for (let i = this.length - 1; i >= 0; i -= 1) {
  //     yield this.toArray()[i];
  //   }
  // }

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
  static listToArray<T>(list: ListType<T>) {
    const arr: T[] = [];
    let head = list;
    while (true) {
      arr.push(head.value);

      if (!head.rest) break;
      head = head.rest;
    }
    return arr;
  }
  static arrayToList<T>(arr: T[]) {
    if (arr.length == 0) return undefined;

    let list: ListType<T> = { value: arr[0] };
    let head: ListType<T> = list;
    for (let i = 1; i < arr.length; i++) {
      let next: ListType<T> = { value: arr[i] };
      head.rest = next;
      head = next;
    }
    return list;
  }

  protected head?: ListType<T>;
  protected depth: number;

  constructor(arr: T[]) {
    super(...arr);
    this.depth = arr.length;
    this.head = ArrayList.arrayToList(arr);
  }

  public add(value: T, index: number = this.depth) {
    let curNode = this.head;
    let prevNode: ListType<T> | undefined = undefined;
    let curDepth = 0;

    if (typeof curNode === "undefined") {
      this.head = { value: value };
      this.depth += 1;
      return this.head;
    }

    while (curNode && curDepth < index) {
      prevNode = curNode;
      curNode = curNode.rest;
      curDepth++;
    }

    if (curNode) {
      if (prevNode) {
        prevNode.rest = { value: value, rest: curNode };
      } else {
        curNode.rest = { value: value };
      }
    } else {
      if (prevNode) {
        prevNode.rest = { value: value };
      }
    }
    this.depth += 1;
    return this.head;
  }

  public remove(value: T) {
    let curNode = this.head;
    let prevNode: ListType<T> | undefined = undefined;
    while (curNode) {
      if (curNode.value === value) {
        if (typeof prevNode === "undefined") {
          this.head = curNode.rest;
        } else {
          prevNode.rest = curNode.rest;
        }
        break;
      }
      prevNode = curNode;
      curNode = curNode.rest;
    }
    this.depth -= 1;
    return this.head;
  }

  public removeByIndex(index: number) {
    let curNode = this.head;
    let prevNode: ListType<T> | undefined = undefined;
    let curDepth = 0;
    while (curNode && curDepth <= index) {
      if (curDepth === index) {
        if (typeof prevNode === "undefined") {
          this.head = curNode.rest;
        } else {
          prevNode.rest = curNode.rest;
        }
        break;
      }
      prevNode = curNode;
      curNode = curNode.rest;
      curDepth++;
    }
    this.depth -= 1;
    return this.head;
  }

  public set(index: number, value: T) {
    let curNode = this.head;
    let curDepth = 0;
    while (curNode) {
      if (curDepth == index) {
        curNode.value = value;
        break;
      }
      curNode = curNode.rest;
      curDepth++;
    }
    return this.head;
  }

  public get(index: number) {
    let curNode = this.head;
    let curDepth = 0;
    while (curNode && curDepth <= index) {
      if (curDepth === index || !curNode.rest) {
        return curNode.value;
      }
      curNode = curNode.rest;
      curDepth++;
    }
  }

  public indexOf(value: T): number {
    let curDepth = 0;
    let curNode = this.head;
    while (curNode) {
      if (curNode.value === value) {
        return curDepth;
      }
      curNode = curNode.rest;
      curDepth++;
    }
    return -1;
  }

  public contains(value: T) {
    let curDepth = 0;
    let curNode = this.head;
    while (curNode) {
      if (curNode.value === value) {
        return true;
      }
      curNode = curNode.rest;
      curDepth++;
    }
    return false;
  }

  public size() {
    return this.depth;
  }

  get length() {
    return this.depth;
  }

  get isEmpty() {
    return !this.head;
  }

  get peek(): T | undefined {
    if (!this.head) return undefined;
    let curNode: ListType<T> | undefined = this.head;
    while (curNode) {
      if (!curNode.rest) {
        return curNode.value;
      }
      curNode = curNode?.rest;
    }
  }

  iterator(): Iterator<T> {
    const arr = this.toArray();
    let i = 0;
    return {
      next: () => ({
        value: arr[i++],
        done: i > arr.length,
      }),
    };
  }

  public toArray(): T[] {
    const arr: T[] = [];
    let curNode = this.head;
    while (curNode) {
      arr.push(curNode.value);
      curNode = curNode.rest;
    }
    return arr;
  }

  public clear() {
    this.head = undefined;
    this.depth = 0;
  }

  public toString() {
    return `ArrayList(${this.depth}) ${
      this.head ? this.printListNode(this.head) : ""
    }`;
  }

  private printListNode(node: ListType<T>): string {
    if (!node.rest) {
      return `{ value: ${node.value} }`;
    }
    return `{ value: ${node.value}, rest: ${this.printListNode(node.rest)} }`;
  }
}

export { Stack, Queue, ArrayList, ListType };
