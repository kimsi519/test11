import { json } from "stream/consumers";

interface ListNode<T> {
  value: T;
  rest?: ListNode<T>;
}

abstract class Collection<T> {
  protected elements: T[] = [];

  constructor() {
    if (new.target === Collection) {
      throw new TypeError("Cannot construct Collection instances directly");
    }
  }

  clear(): void {
    this.elements = [];
  }

  print(): void {
    console.log(this.elements.join(", "));
  }

  isEmpty(): boolean {
    return this.elements?.length === 0;
  }

  peek(): T | undefined {
    return this.elements[0];
  }

  poll(): T | undefined {
    return this.elements.shift();
  }

  length(): number {
    return this.elements?.length;
  }

  toArray(): T[] {
    return [...this.elements];
  }
}

class ArrayList<T> extends Collection<T> {
  private head: ListNode<T> | undefined;

  constructor(array: T[] = []) {
    super();
    this.head = ArrayList.arrayToList(array);
  }

  private static arrayToList<T>(array: T[]): ListNode<T> | undefined {
    let list: ListNode<T> | undefined;
    for (let i = array.length - 1; i >= 0; i--) {
      if (list === undefined) {
        list = { value: array[i] };
      } else {
        list = { value: array[i], rest: list };
      }
    }
    return list;
  }

  private static listToArray<T>(list: ListNode<T> | undefined): T[] {
    const array: T[] = [];
    while (list) {
      array.push(list.value);
      list = list.rest;
    }
    return array;
  }

  private getNodeByIndex(index: number): ListNode<T> | undefined {
    let node = this.head;
    let nodeIndex = 0;

    while (nodeIndex < index && node?.rest) {
      node = node.rest;
      nodeIndex++;
    }
    return node;
  }

  add(value: T, index: number | null = null): void {
    if (index === null || index >= this.size()) {
      if (this.head?.rest) this.head.rest.rest = { value };
    } else {
      let prev = this.getNodeByIndex(index - 1);
      if (prev?.rest) {
        prev.rest = { value, rest: prev.rest };
      }
    }
  }

  removeByIndex(index: number): void {
    if (index === 0) {
      this.head = this.head?.rest;
    } else {
      let prev = this.getNodeByIndex(index - 1);
      if (prev?.rest) {
        prev.rest = prev.rest.rest;
      }
    }
  }

  remove(value: T): void {
    const index = this.indexOf(value);
    this.removeByIndex(index);
  }

  get(index: number): T | undefined {
    let current = this.getNodeByIndex(index);
    return current?.value;
  }

  set(index: number, value: T): void {
    let current = this.getNodeByIndex(index);
    if (current) {
      current.value = value;
    }
  }

  size(): number {
    let current = this.head;
    let currentIndex = 0;

    while (current) {
      current = current.rest;
      currentIndex++;
    }

    return currentIndex;
  }

  indexOf(value: T): number {
    let current = this.head;
    let currentIndex = 0;

    while (current) {
      if (current.value === value) {
        return currentIndex;
      }
      current = current.rest;
      currentIndex++;
    }

    return -1;
  }

  contains(value: T): boolean {
    return this.indexOf(value) !== -1;
  }

  isEmpty(): boolean {
    return this.head === undefined;
  }

  peek(): T | undefined {
    return this.head?.value;
  }

  toArray(): T[] {
    return ArrayList.listToArray(this.head);
  }

  toString(): string {
    return JSON.stringify(this.head);
  }

  clear(): void {
    this.head = undefined;
  }

  print(): ListNode<T> | undefined {
    return this.head;
  }

  *iterator(): IterableIterator<T> {
    let node = this.head;
    while (node) {
      yield node.value;
      node = node.rest;
    }
  }
}

class Stack<T> extends Collection<T> {}
class Queue<T> extends Collection<T> {}

export { Stack, Queue, ArrayList };
