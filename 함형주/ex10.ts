type ListNode = {
  value: number;
  rest?: ListNode | null; 
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
  private head: ListNode | null = null;

  constructor(values: number[] = []) {
    values.forEach((value) => this.add(value));
  }

  // 연결 리스트에 값을 추가
  add(value: number): void {
    if (this.head === null) {
      this.head = { value, rest: null };
    } else {
      let current = this.head;
      while (current.rest !== null) {
        current = current.rest;
      }
      current.rest = { value, rest: null };
    }
  }
  get(index: number): T | undefined {

  }

  listToArray(): T[] {

  }


  arrayToList(array: T[]): void {
  
  }

  removeByIndex(index: number): void {
    
  }


  set(index: number, value: T): void {
  }


  indexOf(value: T): number {
  }


  contains(value: T): boolean {
  }

  get size(): number {

  }

  toString(): string {

  }


  
}

export { Stack, Queue, ArrayList };

const alist:any= new ArrayList([1,2]);
alist.add(3);
console.log(ArrayList.listToArray({value:1,rest:{value}}));