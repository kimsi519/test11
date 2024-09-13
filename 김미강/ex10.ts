class Collection<T> {
  protected size: number = 0;

  // Convert the structure to an array
  toArray(): T[] {
    return [];
  }

  // Other basic collection methods, like size or clear, can be extended
  getSize(): number {
    return this.size;
  }

  clear() {
    this.size = 0;
  }

  toString() {
    return `<${this.constructor.name}: [${this.toArray()}]>`;
  }
}

interface ListNode<T> {
  value: T;
  rest: ListNode<T> | null;
}

class ArrayList<T> extends Collection<T> {
  private head: ListNode<T> | null = null;

  constructor(values: T[] = []) {
    super();
    this.size = values.length;
    this.head = ArrayList.arrayToList(values);
  }

  // Static method to convert a linked list to an array
  static listToArray<T>(node: ListNode<T> | null): T[] {
    const result: T[] = [];
    while (node) {
      result.push(node.value);
      node = node.rest;
    }
    return result;
  }

  // Static method to convert an array to a linked list
  static arrayToList<T>(arr: T[]): ListNode<T> | null {
    if (arr.length === 0) return null;
    const [first, ...rest] = arr;
    return { value: first, rest: ArrayList.arrayToList(rest) };
  }

  // Overloading signatures
  add(value: T): void;
  add(value: T, index: number): void;

  // Implementation
  add(value: T, index?: number): void {
    if (index === undefined) {
      // Add value at the end of the list
      this.addAt(this.head, value, this.size);
    } else {
      // Add value at a specified index
      if (index < 0 || index > this.size) {
        throw new RangeError("Index out of bounds");
      }
      this.head = this.addAt(this.head, value, index);
    }
    this.size++;
  }

  private addAt(
    node: ListNode<T> | null,
    value: T,
    index: number
  ): ListNode<T> {
    if (index === 0) return { value, rest: node };
    if (!node) throw new Error("Invalid state");
    node.rest = this.addAt(node.rest, value, index - 1);
    return node;
  }

  // Remove the first occurrence of a value
  remove(value: T): void {
    let current: ListNode<T> | null = this.head;
    let previous: ListNode<T> | null = null;

    while (current) {
      if (current.value === value) {
        if (previous) {
          previous.rest = current.rest;
        } else {
          this.head = current.rest;
        }
        this.size--;
        return;
      }
      previous = current;
      current = current.rest;
    }
  }

  // Remove a value at a specified index
  removeByIndex(index: number): void {
    if (index < 0 || index >= this.size)
      throw new RangeError("Index out of bounds");

    this.head = this.removeAt(this.head, index);
    this.size--;
  }

  private removeAt(
    node: ListNode<T> | null,
    index: number
  ): ListNode<T> | null {
    if (index === 0 && node) return node.rest;
    if (!node) throw new Error("Invalid state");
    node.rest = this.removeAt(node.rest, index - 1);
    return node;
  }

  // Set a value at a specific index
  set(index: number, value: T): void {
    if (index < 0 || index >= this.size)
      throw new RangeError("Index out of bounds");

    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node?.rest ?? null;
    }
    if (node) {
      node.value = value;
    }
  }

  // Get a value at a specific index
  get(index: number): T | undefined {
    if (index < 0 || index >= this.size)
      throw new RangeError("Index out of bounds");

    let node = this.head;
    for (let i = 0; i < index; i++) {
      node = node?.rest ?? null;
    }
    return node?.value;
  }

  // Check if a value is contained in the list
  contains(value: T): boolean {
    let node = this.head;
    while (node) {
      if (node.value === value) return true;
      node = node.rest;
    }
    return false;
  }

  // Convert to array
  toArray(): T[] {
    return ArrayList.listToArray(this.head);
  }

  // Find index of a specific value
  indexOf(value: T): number {
    let node = this.head;
    let index = 0;
    while (node) {
      if (node.value === value) return index;
      node = node.rest;
      index++;
    }
    return -1;
  }
  // Getter를 추가하여 size에 접근 가능하도록
  get listSize(): number {
    return this.size;
  }

  // Peek at the last value
  get peek(): T | undefined {
    return this.get(this.size - 1);
  }

  // Check if the list is empty
  get isEmpty(): boolean {
    return this.size === 0;
  }

  // Clear the list
  clear(): void {
    this.head = null;
    this.size = 0;
  }

  // Print the list
  print(): void {
    console.log(this.toString());
  }

  // Iterator
  iterator(): Iterator<T> {
    let node = this.head;
    return {
      next(): IteratorResult<T> {
        if (node) {
          const value = node.value;
          node = node.rest;
          return { value, done: false };
        } else {
          return { value: undefined as any, done: true };
        }
      },
    };
  }

  toString() {
    return `ArrayList(${this.size}) ${JSON.stringify(this.head)}`;
  }
}

export { ArrayList };
