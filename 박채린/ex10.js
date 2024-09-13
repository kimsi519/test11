"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayList = exports.Queue = exports.Stack = void 0;
class Collection {
    constructor(...args) {
        this.arr = Array();
        this.arr.push(...args);
    }
    get _arr() {
        return this.arr;
    }
    push(...args) {
        this.arr.push(...args);
        return this.arr;
    }
    get peek() {
        return this.isQueue() ? this.arr[0] : this.arr.at(-1);
    }
    get poll() {
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
    isQueue() {
        return this instanceof Queue;
    }
}
class Stack extends Collection {
}
exports.Stack = Stack;
class Queue extends Collection {
}
exports.Queue = Queue;
// ArrayList 클래스를 작성하세요.
class ArrayList extends Collection {
}
exports.ArrayList = ArrayList;
