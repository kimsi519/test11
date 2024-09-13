// class Collection<T> {
//   private readonly arr = Array<T>();

//   constructor(...args: T[]) {
//     this.arr.push(...args);
//   }

//   get _arr() {
//     return this.arr;
//   }

//   push(...args: T[]) {
//     this.arr.push(...args);
//     return this.arr;
//   }

//   get peek(): T | undefined {
//     return this.isQueue() ? this.arr[0] : this.arr.at(-1);
//   }

//   get poll(): T | undefined {
//     return this.isQueue() ? this.arr.shift() : this.arr.pop();
//   }

//   remove() {
//     return this.poll;
//   }

//   get length() {
//     return this.arr.length;
//   }

//   get isEmpty() {
//     return !this.arr.length;
//   }

//   clear() {
//     this.arr.length = 0;
//   }

//   iterator() {
//     return this[Symbol.iterator]();
//   }

//   // [1, 2, 3]
//   *[Symbol.iterator]() {
//     for (let i = this.length - 1; i >= 0; i -= 1) {
//       yield this.toArray()[i];
//     }
//   }

//   toArray() {
//     return this.isQueue() ? this.arr.toReversed() : this.arr;
//   }

//   print() {
//     console.log(`<${this.constructor.name}: [${this.toArray()}]>`);
//   }

//   private isQueue() {
//     return this instanceof Queue;
//   }
// }

// class Stack<T> extends Collection<T> {}
// class Queue<T> extends Collection<T> {}

// // ArrayList 클래스를 작성하세요.
// class ArrayList<T> extends Collection<T> {
//   constructor(...args: T[]) {
//     super(...args);
//   }

//   add(value: T, index?: number): void {
//     if (index === undefined) {
//       this._arr.push(value);
//     } else {
//       this._arr.splice(index, 0, value);
//     }
//   }

//   get(index: number): T | undefined {
//     return this._arr[index];
//   }

//   removeValue(value: T): boolean {
//     const index = this.indexOf(value);
//     if (index !== -1) {
//       this._arr.splice(index, 1);
//       return true;
//     }
//     return false;
//   }

//   removeByIndex(index: number): T | undefined {
//     if (index >= 0 && index < this.length) {
//       return this._arr.splice(index, 1)[0];
//     }
//     return undefined;
//   }

//   set(index: number, value: T): void {
//     if (index >= 0 && index < this.length) {
//       this._arr[index] = value;
//     }
//   }

//   contains(value: T): boolean {
//     return this._arr.includes(value);
//   }

//   indexOf(value: T): number {
//     return this._arr.indexOf(value);
//   }

//   size(): number {
//     return this.length;
//   }

//   toArray(): T[] {
//     return [...this._arr];
//   }

//   toString(): string {
//     return `ArrayList(${this.size()}) { ${this._arr.map((v) => `value: ${v}`).join(', ')} }`;
//   }
// }

// export { Stack, Queue, ArrayList };

/********************************************************************************************************************** */
interface Collection<T> {
  add(value: T, index?: number): void;
  remove(index: number): void;
  clear(): void;
  contains(value: T): boolean;
  size(): number;
  isEmpty(): boolean;
  toArray(): T[];
  iterator(): Iterator<T>;
}

interface ListNode<T> {
  value: T;
  rest: ListNode<T> | null;
}

class ArrayList<T> implements Collection<T> {
  private head: ListNode<T> | null = null;
  private length: number = 0;

  constructor(array: T[] = []) {
    this.clear();
    if (Array.isArray(array)) {
      array.forEach((item) => this.add(item));
    }
  }

  clear(): void {
    this.head = null;
    this.length = 0;
  }

  add(value: T, index: number = this.size()): void {
    if (index < 0 || index > this.size()) throw new Error('Index out of bounds');

    const newNode: ListNode<T> = { value, rest: null };

    if (index === 0) {
      newNode.rest = this.head;
      this.head = newNode;
    } else {
      const prevNode = this._getNode(index - 1);
      newNode.rest = prevNode.rest;
      prevNode.rest = newNode;
    }

    this.length++;
  }

  remove(index: number): void {
    if (index < 0 || index >= this.size()) throw new Error('Index out of bounds');

    if (index === 0) {
      this.head = this.head!.rest;
    } else {
      const prevNode = this._getNode(index - 1);
      prevNode.rest = prevNode.rest!.rest;
    }

    this.length--;
  }

  set(index: number, value: T): void {
    const node = this._getNode(index);
    node.value = value;
  }

  get(index: number): T {
    return this._getNode(index).value;
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  indexOf(value: T): number {
    let currentNode = this.head;
    let index = 0;
    while (currentNode) {
      if (currentNode.value === value) return index;
      currentNode = currentNode.rest;
      index++;
    }
    return -1;
  }

  peek(): T | undefined {
    if (!this.head) return undefined;
    return this.head.value;
  }

  size(): number {
    return this.length;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  toArray(): T[] {
    const result: T[] = [];
    let currentNode = this.head;
    while (currentNode) {
      result.push(currentNode.value);
      currentNode = currentNode.rest;
    }
    return result;
  }

  toString(): string {
    return `ArrayList(${this.size()}) ${JSON.stringify(this.head)}`;
  }

  iterator(): Iterator<T> {
    let currentNode = this.head;
    return {
      next: (): IteratorResult<T> => {
        if (!currentNode) {
          return { value: undefined, done: true };
        }
        const value = currentNode.value;
        currentNode = currentNode.rest;
        return { value, done: false };
      }
    };
  }

  private _getNode(index: number): ListNode<T> {
    if (index < 0 || index >= this.size()) throw new Error('Index out of bounds');
    let currentNode = this.head;
    for (let i = 0; i < index; i++) {
      currentNode = currentNode!.rest;
    }
    return currentNode!;
  }

  static listToArray<T>(list: ListNode<T> | null): T[] {
    const array: T[] = [];
    let current = list;
    while (current) {
      array.push(current.value);
      current = current.rest;
    }
    return array;
  }

  static arrayToList<T>(array: T[]): ListNode<T> | null {
    let head: ListNode<T> | null = null;
    for (let i = array.length - 1; i >= 0; i--) {
      head = { value: array[i], rest: head };
    }
    return head;
  }
}

export {ArrayList };

// console.log(ArrayList.listToArray({ value: 1, rest: { value: 2, rest: null } })); //⇒ [1,2]
// console.log(ArrayList.arrayToList([1, 2])); //⇒ { value: 1, rest: { value: 2, rest: null } }

// const alist = new ArrayList<number>([1, 2]);
// console.log(alist.toString());
// alist.add(3);
// console.log(alist.toString());
// alist.add(5, 1);
// console.log(alist.toString());
// alist.remove(2);
// console.log(alist.toString());
// alist.add(22, 1);
// console.log(alist.toString());
// alist.add(33, 1);
// console.log(alist.toString());
// alist.set(1, 300);
// console.log(alist.toString());
// console.log(alist.get(2));
// console.log(alist.size());
// console.log(alist.indexOf(300));
// console.log(alist.contains(300));
// console.log(alist.contains(301));
// console.log(alist.isEmpty());
// console.log(alist.peek());
// console.log(alist.toArray());
// console.log(alist.iterator().next());
// alist.clear();
// console.log(alist.toString());


