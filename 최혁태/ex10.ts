class Collection<T> {
	protected readonly arr: T[] = [];
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
		return this.isQueue() ? this.arr[0] : this.arr[this.arr.length - 1];
	}

	get poll(): T | undefined {
		return this.isQueue() ? this.arr.shift() : this.arr.pop();
	}

	remove(index?: number): T | undefined {
		if (index === undefined) {
			return this.poll;
		}
		if (index >= 0 && index < this.arr.length) {
			return this.arr.splice(index, 1)[0];
		}
		return undefined;
	}

	get length() {
		return this.arr.length;
	}

	get isEmpty() {
		return this.arr.length === 0;
	}

	clear() {
		this.arr.length = 0;
	}

	iterator() {
		return this[Symbol.iterator]();
	}

	*[Symbol.iterator]() {
		for (let i = this.arr.length - 1; i >= 0; i -= 1) {
			yield this.arr[i];
		}
	}

	toArray() {
		return this.isQueue() ? [...this.arr].reverse() : [...this.arr];
	}

	print() {
		console.log(`<${this.constructor.name}: [${this.toArray()}]>`);
	}

	protected isQueue() {
		return this.constructor.name === "Queue";
	}
}

class ArrayList<T> extends Collection<T> {
	constructor(items: T[] = []) {
		super(...items);
	}

	add(item: T, index?: number): void {
		if (index !== undefined && index >= 0 && index <= this.arr.length) {
			this.arr.splice(index, 0, item);
		} else {
			this.arr.push(item);
		}
	}

	set(index: number, item: T): void {
		if (index >= 0 && index < this.arr.length) {
			this.arr[index] = item;
		}
	}

	get(index: number): T | undefined {
		return this.arr[index];
	}

	get size(): number {
		return this.arr.length;
	}

	indexOf(item: T): number {
		return this.arr.indexOf(item);
	}

	contains(item: T): boolean {
		return this.arr.includes(item);
	}

	toArray(): T[] {
		return [...this.arr];
	}

	toString(): string {
		return `ArrayList(${this.size}) ${this.toLinkedListString()}`;
	}

	private toLinkedListString(): string {
		if (this.isEmpty) return "null";
		const buildList = (index: number): string => {
			if (index === this.arr.length - 1) {
				return `{ value: ${this.arr[index]} }`;
			}
			return `{ value: ${this.arr[index]}, rest: ${buildList(
				index + 1
			)} }`;
		};
		return buildList(0);
	}
}

class Stack<T> extends Collection<T> {}
class Queue<T> extends Collection<T> {}

export { Stack, Queue, ArrayList };
