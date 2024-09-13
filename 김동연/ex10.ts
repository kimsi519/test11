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

  }

  // 특정 인덱스에 value 대입
  set(index: number, value: T): void {
    if (index >= this.length || index < 0) {
      throw new Error("범위를 벗어났습니다.");
    }
    this._arr[index] = value;
  }

  // 특정 인덱스 값 가져오기
  get(index: number): T {
    if (index >= this.length || index < 0) {
      throw new Error("범위를 벗어났습니다");
    }
    return this._arr[index];
  }

}



