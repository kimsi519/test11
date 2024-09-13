type ListNode<T> = {
  value: T;
  rest: ListNode<T> | null;
};

class Collection<T> {
  protected readonly arr = Array<T>();

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
}

class ArrayList<T> extends Collection<T> {
  public static listToArray<T>(list: ListNode<T>): T[] {
    const arr: T[] = [];
    let lst = list;
    while (true) {
      let value = lst.value;
      arr.push(value);
      if (lst.rest === null) {
        break;
      }
      lst = lst.rest as ListNode<T>;
    }
    return arr;
  }
  public static arrayToList<T>(arr: T[]): ListNode<T> {
    if (arr.length === 0) {
      throw Error('Array is empty');
    }
    let node: ListNode<T> = { value: arr[0], rest: null };
    let current = node;
    for (let i = 1; i < arr.length; i++) {
      current.rest = { value: arr[i], rest: null };
      current = current.rest;
    }
    return node;
  }

  private node: ListNode<T> | null;

  constructor(arr: T[]) {
    super();
    this.push(...arr);
    this.node = this.arrayToLinkedNode(this._arr) as ListNode<T>;
  }

  toString(): string {
    const listToString = (node: ListNode<T> | null): string => {
      if (!node) return 'null';
      return `{ value: ${node.value}, rest: ${
        node.rest ? listToString(node.rest) : 'null'
      } }`;
    };

    return listToString(this.node as ListNode<T>);
  }

  add(item: T, index?: number): ListNode<T> {
    if (index === undefined) {
      let lst = this.node;
      if (!lst) {
        this.node = { value: item, rest: null };
        return this.node;
      }
      while (lst.rest !== null) {
        lst = lst.rest as ListNode<T>;
      }
      lst.rest = { value: item, rest: null };
      return this.node as ListNode<T>;
    } else {
      if (index < 0) {
        throw new Error('Index must be greater than or equal to 0');
      }

      if (index === 0) {
        this.node = { value: item, rest: this.node as ListNode<T> };
        return this.node;
      }

      let current: ListNode<T> = this.node as ListNode<T>;
      let depth = 0;

      while (current.rest !== null && depth < index - 1) {
        current = current.rest;
        depth++;
      }

      if (current === undefined) {
        throw new Error('Index is out of range');
      }

      current.rest = { value: item, rest: current.rest };
      return this.node as ListNode<T>;
    }
  }

  remove(item: T): ListNode<T> | null {
    if (!this.node) {
      return null;
    }
    if (this.node.value === item) {
      this.node = this.node.rest as ListNode<T>;
      return this.node;
    }

    let current = this.node;
    while (current.rest !== null) {
      if (current.rest.value === item) {
        current.rest = current.rest.rest;
        return this.node;
      }
      current = current.rest;
    }
    return this.node;
  }

  removeByIndex(index: number): ListNode<T> | null {
    if (!this.node) {
      return null;
    }
    if (index === 0) {
      this.node = this.node.rest as ListNode<T>;
      return this.node;
    }

    let current: ListNode<T> | null = this.node;
    let depth = 0;

    while (current !== null && current.rest !== null && depth < index - 1) {
      current = current.rest;
      depth++;
    }

    if (current?.rest === null) {
      throw new Error('Index is out of range');
    }

    current.rest = current.rest.rest;
    return this.node;
  }

  set(index: number, insertValue: T): ListNode<T> | null {
    if (!this.node) {
      throw new Error('Array is empty');
    }
    let current: ListNode<T> | null = this.node;
    let depth = 0;

    while (depth < index) {
      if (!current?.rest) {
        throw new Error('Index is out of range');
      }
      current = current.rest;
      depth++;
    }

    if (current) {
      current.value = insertValue;
    }

    return this.node;
  }

  get(index: number) {
    let lst = this.node as ListNode<T>;
    if (index === 0) {
      return lst.value;
    }

    let current: ListNode<T> | null = this.node as ListNode<T>;
    let depth = 0;
    while (current !== null && current.rest !== null && depth <= index - 1) {
      current = current.rest;
      depth++;
    }
    if (current) {
      return current.value;
    }
  }

  public peek(): T | null {
    if (this.size() === 0) {
      return null;
    }
    return this.arr[0];
  }

  indexOf(targetValue: T): number | null {
    if (!this.node) {
      return -1;
    }

    let current = this.node;
    let index = 0;

    while (current !== null) {
      if (current.value === targetValue) {
        return index;
      }
      current = current.rest as ListNode<T>;
      index++;
    }
    return -1;
  }

  contains(value: T): boolean {
    if (!this.node) {
      return false;
    }
    let current = this.node;
    while (current !== null) {
      if (current.value === value) {
        return true;
      }
      current = current.rest as ListNode<T>;
    }

    return false;
  }

  isEmpty(): boolean {
    return this.node === null;
  }

  size(): number {
    if (this.node === null) {
      return 0;
    }

    let lst = this.node as ListNode<T>;
    let depth: number = 0;
    while (lst.rest !== null) {
      lst = lst.rest as ListNode<T>;
      depth++;
    }
    return depth + 1;
  }

  clear() {
    this.node = null;
  }

  [Symbol.iterator](): Iterator<T> {
    let current = this.node as ListNode<T>;

    return {
      next(): IteratorResult<T> {
        if (current === null) {
          return { value: undefined, done: true };
        }

        let value = current.value;
        current = current.rest as ListNode<T>;
        return { value, done: false };
      },
    };
  }

  toArray(): T[] {
    const list: ListNode<T> = this.node as ListNode<T>;
    const arr: T[] = [];
    let lst = list;
    while (true) {
      let value = lst.value;
      arr.push(value);
      if (lst.rest === null) {
        break;
      }
      lst = lst.rest as ListNode<T>;
    }
    return arr;
  }

  arrayToLinkedNode<T>(arr: T[]): ListNode<T> | null {
    if (arr.length === 0) {
      return null;
    }

    let node: ListNode<T> = { value: arr[0], rest: null };
    let current = node;

    for (let i = 1; i < arr.length; i++) {
      current.rest = { value: arr[i], rest: null };
      current = current.rest;
    }
    return node;
  }
}

export { ArrayList, Collection };
