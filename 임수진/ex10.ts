interface ListNode<T> {
    value: T;
    rest: ListNode<T> | null;
  }
  
  class Collection<T> {
    protected items: T[] = [];
  
    push(...args: T[]): T[] {
      this.items.push(...args);
      return this.items;
    }
  
    get _arr(): T[] {
      return this.items;
    }
  }
  
  class ArrayList<T> extends Collection<T> {
    private node: ListNode<T> | null = null;
  
    constructor(arr: T[] = []) {
      super();
      this.push(...arr);
      this.node = this.arrayToLinkedNode(this._arr);
    }
  
    public static arrayToList<T>(array: T[]): ListNode<T> | null {
      if (array.length === 0) return null;
      let result: ListNode<T> = { value: array[0], rest: null };
      let current = result;
      for (let i = 1; i < array.length; i++) {
        current.rest = { value: array[i], rest: null };
        current = current.rest;
      }
      return result;
    }
  
    public static listToArray<T>(list: ListNode<T> | null): T[] {
      const result: T[] = [];
      let current = list;
      while (current) {
        result.push(current.value);
        current = current.rest || null;
      }
      return result;
    }
  
    arrayToLinkedNode(arr: T[]): ListNode<T> | null {
      if (arr.length === 0) return null;
      let node: ListNode<T> = { value: arr[0], rest: null };
      let current = node;
      for (let i = 1; i < arr.length; i++) {
        current.rest = { value: arr[i], rest: null };
        current = current.rest;
      }
      return node;
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
      } else {
        if (index < 0) throw new Error('Index must be greater than or equal to 0');
        if (index === 0) {
          this.node = { value: item, rest: this.node };
          return this.node;
        }
  
        let current = this.node;
        let depth = 0;
        while (current?.rest !== null && depth < index - 1) {
            if (current) current = current.rest;
          
          depth++;
        }
  
        if (!current) throw new Error('Index is out of range');
        current.rest = { value: item, rest: current.rest };
      }
      return this.node as ListNode<T>;
    }
  
    size(): number {
        let current = this.node;
        let count = 0;
        while (current !== null) {
          count++;
          current = current.rest;
        }
        return count;
    }
    
    remove(item: T): ListNode<T> | null {
      if (!this.node) return null;
      if (this.node.value === item) {
        this.node = this.node.rest || null;
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
      if (!this.node) return null;
      if (index === 0) {
        this.node = this.node.rest || null;
        return this.node;
      }
  
      let current = this.node;
      let depth = 0;
      while (current?.rest !== null && depth < index - 1) {
        current = current.rest;
        depth++;
      }
  
      if (!current?.rest) throw new Error('Index is out of range');
      current.rest = current.rest.rest;
      return this.node;
    }
  
    set(index: number, item: T): ListNode<T> | null {
      if (!this.node) throw new Error('Array is empty');
      let current = this.node;
      let depth = 0;
      while (depth < index) {
        if (!current?.rest) throw new Error('Index is out of range');
        current = current.rest;
        depth++;
      }
      current.value = item;
      return this.node;
    }
  
    get(index: number): T | undefined {
      if (!this.node) return undefined;
      let current = this.node;
      let depth = 0;
      while (depth < index) {
        if (!current?.rest) return undefined;
        current = current.rest;
        depth++;
      }
      return current?.value;
    }
  
    toArray(): T[] {
      return ArrayList.listToArray(this.node);
    }
  
    toString(): string {
      const listToString = (node: ListNode<T> | null): string => {
        if (!node) return 'null';
        return `{ value: ${node.value}, rest: ${listToString(node.rest || null)} }`;
      };
      return listToString(this.node);
    }
  
    clear(): void {
      this.node = null;
    }
  
    isEmpty(): boolean {
      return this.node === null;
    }
  
    contains(item: T): boolean {
      let current = this.node;
      while (current) {
        if (current.value === item) return true;
        current = current.rest;
      }
      return false;
    }
  
    indexOf(item: T): number | null {
      let current = this.node;
      let index = 0;
      while (current) {
        if (current.value === item) return index;
        current = current.rest;
        index++;
      }
      return -1;
    }
  
    peek(): T | null {
      return this.node?.value || null;
    }
  
    [Symbol.iterator](): Iterator<T> {
      let current = this.node;
      return {
        next(): IteratorResult<T> {
          if (!current) {
            return { value: undefined, done: true };
          }
          let value = current.value;
          current = current.rest || null;
          return { value, done: false };
        },
      };
    }
  }
  
  export { ArrayList, Collection };
  