class Collection<T> {
  protected readonly arr: T[] = [];

  constructor(values?: T[]) {
    if (values) {
      this.arr.push(...values);
    }
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

  toArray(): T[] {
    return [...this.arr];
  }

  print() {
    console.log(`<${this.constructor.name}: [${this.toArray()}]>`);
  }
}

class ArrayList<T> extends Collection<T> {
  constructor(values?: T[]) {
    super(values);
  }

  add(value: T): void;
  add(value: T, index: number): void;
  add(value: T, index?: number): void {
    if (index !== undefined) {
      // index가 주어진 경우
      if (index >= this.length) {
        this.arr.push(value); // 인덱스가 배열의 길이보다 크면 끝에 추가
      } else {
        this.arr.splice(index, 0, value); // 특정 인덱스에 추가
      }
    } else {
      // 인덱스가 주어지지 않은 경우, 값 추가
      this.arr.push(value);
    }
  }

  toString(): string {
    const stringify = (node: any): string => {
      if (!node) return '';
      const next = node.rest ? `, rest: { ${stringify(node.rest)} }` : '';
      return `value: ${node.value}${next}`;
    };

    const list = this.toArray().reduceRight<{ value: T; rest: any } | null>(
      (acc, value) => ({ value, rest: acc }),
      null
    );

    return stringify(list);
  }

  get(index: number): T | undefined {
    return this.arr[index];
  }

  remove(value: T): boolean {
    const index = this.arr.indexOf(value);
    if (index !== -1) {
      this.arr.splice(index, 1);
      return true;
    }
    return false;
  }

  removeByIndex(index: number): boolean {
    if (index >= 0 && index < this.length) {
      this.arr.splice(index, 1);
      return true;
    }
    return false;
  }

  set(index: number, value: T): void {
    if (index >= 0 && index < this.length) {
      this.arr[index] = value;
    }
  }

  contains(value: T): boolean {
    return this.arr.includes(value);
  }

  indexOf(value: T): number {
    return this.arr.indexOf(value);
  }

  get peek(): T | undefined {
    return this.arr[this.length - 1];
  }

  print(): void {
    console.log(`ArrayList(${this.length}) { value: ${this.toString()} }`);
  }

  get listSize(): number {
    return this.length;
  }

  static listToArray(list: { value: any; rest: any }): any[] {
    const result: any[] = [];
    let current = list;

    while (current) {
      result.push(current.value);
      current = current.rest;
    }

    return result;
  }

  static arrayToList(arr: any[]): { value: any; rest: any } {
    return arr.reduceRight((acc, value) => ({ value, rest: acc }), null);
  }
}

export { ArrayList };