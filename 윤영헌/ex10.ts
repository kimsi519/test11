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
}

class Stack<T> extends Collection<T> {}
class Queue<T> extends Collection<T> {}

// ArrayList 클래스를 작성하세요.
export interface ListNode<T> {
  value: T;
  rest?: ListNode<T>;
}

class ArrayList<T> extends Collection<T> {
  // {} = list
  // [] = array
  public static listToArray(list: ListNode<any>):any[]{
    const arr: any[] = [];
    let lst = list;
    while(true){
      let value = lst.value;
      arr.push(value);
      if(lst.rest === undefined){break};
      lst = lst.rest as ListNode<any>;
    }
    return arr;
  }
  public static arrayToList(arr: any[]):ListNode<any>{
    if (arr.length === 0) { throw Error('배열이 비어있습니다.'); }
    let node: ListNode<any> = { value: arr[0] };
    let current = node;
    for (let i = 1; i < arr.length; i++) {
      current.rest = { value: arr[i] };  
      current = current.rest;           
    }
    return node;
  }
  private node: ListNode<T> | null; // 메인으로 관리해야 하는 객체형 리스트

  constructor(arr: T[]){
    super()
    this.push(...arr);
    this.node = this.arrayToLinkedNode(this._arr) as ListNode<T>;
  }

  toString(): string {
    const listToString = (node: ListNode<T> | undefined): string => {
      if (!node) {
        return 'a';
      }
      return `{ value: ${node.value}, rest: ${node.rest ? listToString(node.rest) : 'no more'} }`;
    };
  
    return listToString(this.node as ListNode<T>);
  }

  add(addValue: T, index?: number): ListNode<T> {
    if (index === undefined) {
      // 인덱스가 없는 경우: 리스트의 끝에 값 추가
      let lst = this.node;
      if (!lst) {
        this.node = { value: addValue };
        return this.node;
      }
      while (lst.rest !== undefined) {
        lst = lst.rest as ListNode<any>;
      }
      lst.rest = { value: addValue };
      return this.node as ListNode<T>;
    } else {
      // 인덱스가 있는 경우: 지정한 인덱스에 값 추가
      if (index < 0) {
        throw new Error("인덱스는 0 이상의 정수여야 합니다.");
      }

      if (index === 0) {
        this.node = { value: addValue, rest: this.node as ListNode<T> };
        return this.node;
      }

      let current: ListNode<T> | undefined = this.node as ListNode<T>;
      let depth = 0;

      while (current !== undefined && depth < index - 1) {
        current = current.rest;
        depth++;
      }

      if (current === undefined) {
        throw new Error("인덱스가 리스트의 길이를 초과했습니다.");
      }

      current.rest = { value: addValue, rest: current.rest };
      return this.node as ListNode<T>;
    }
  }

  remove(removedValue: T): ListNode<T> | undefined {
    if( !this.node){return undefined};
    if(this.node.value === removedValue){
      this.node = this.node.rest as ListNode<T>;
      return this.node;
    }

    let current = this.node;
    while(current.rest !== undefined){
      if(current.rest.value === removedValue){
        current.rest = current.rest.rest;
        return this.node;
      }
      current = current.rest;
    }
    return this.node;
  }

  removeByIndex(index: number): ListNode<T> | undefined {
    if(!this.node){return undefined};
    if(index === 0){
      this.node = this.node.rest as ListNode<T>;
      return this.node;
    }

    let current: ListNode<T> | undefined = this.node;
    let depth = 0;

    while(current!==undefined && current.rest!==undefined && depth<index-1){
      current = current.rest;
      depth++;
    }

    if(current?.rest === undefined){throw new Error("인덱스가 리스트의 길이를 초과했습니다.")}

    current.rest = current.rest.rest;
    return this.node;
  }

  set(index: number, insertValue: T): ListNode<T> | undefined {
    if (!this.node) { throw new Error("빈 배열입니다."); }
    let current: ListNode<T> | null = this.node;
    let depth = 0;
  
    while (depth < index) {
      if (!current?.rest) { throw new Error("인덱스가 리스트의 길이를 초과했습니다."); }
      current = current.rest;
      depth++;
    }
  
    if (current) {
      current.value = insertValue;
    }
  
    return this.node;
  }

  get(index: number){
    let lst = this.node as ListNode<T>;
    if(index === 0){return lst.value;}

    let current: ListNode<T> | undefined = this.node as ListNode<T>;
    let depth = 0;
    while(current!==undefined && current.rest!==undefined && depth<=index-1){
      current = current.rest;
      depth++;
    }
    if(current){return current.value}
  }

  peek() {
    return this.get(this.size() - 1);
  }

  indexOf(targetValue: T): number | undefined{
    if( !this.node){return undefined};

    let current = this.node;
    let index = 0;

    while(current !== undefined){
      if(current.value === targetValue){return index;}
      current = current.rest as ListNode<T>;
      index++;
    }
    return undefined;
  }

  contains(value: T): boolean{
    if(!this.node){return false;}
    let current = this.node;
    while(current !== undefined){
      if(current.value === value){return true;}
      current = current.rest as ListNode<T>;
    }

    return false;
  }

  isEmpty(): boolean {
    return this.node === null;
  }

  size(): number{
    let lst = this.node as ListNode<T>;
    let depth:number = 0;
    while(true){
      if(lst.rest === undefined){
        break;
      };
      lst = lst.rest as ListNode<T>;
      depth++;
    }
    return (depth + 1);
  }

  clear(){
    this.node = null;
    console.log("배열이 초기화되었습니다. add() 함수를 통해 초기 배열을 할당해주세요.")
  }

  iterator() {
    let current = this.node as ListNode<T>;

    return {
      next(): { value: T | undefined; done: boolean } {
        if (current === undefined) {
          return { value: undefined, done: true };
        }

        let value  = current.value ;
        current = current.rest as ListNode<T>;
        return { value, done: false };
      }
    };
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
    const arr: any[] = [];
    let lst = list;
    while(true){
      let value = lst.value;
      arr.push(value);
      if(lst.rest === undefined){break};
      lst = lst.rest as ListNode<any>;
    }
    return arr;
  }

  // 초기 배열을 리스트 노드로 변환
  arrayToLinkedNode<T>(arr:T[]):ListNode<T>|null{
    if (arr.length === 0) { return null; }

    let node: ListNode<T> = { value: arr[0] };
    let current = node;

    for (let i = 1; i < arr.length; i++) {
      current.rest = { value: arr[i] };  
      current = current.rest;           
    };
    return node;
  }
}

const arrLst = new ArrayList<Number>([1,2,3,4]);
console.log(arrLst.toString())
// console.log(arrLst.add(3))
// console.log(arrLst.add(5))
// console.log(arrLst.add(2, 1))
// console.log(arrLst.add(4, 3))
// console.log(arrLst.toString())
// console.log(arrLst.get(2))
// console.log(arrLst.indexOf(3))
// console.log(arrLst.remove(1))
// console.log(arrLst.removeByIndex(0))
// console.log(arrLst.toString())
// console.log(arrLst.set(0, 300))
// console.log(arrLst.contains(300))
// console.log(arrLst.contains(301))
// console.log(arrLst.toString())
// console.log(arrLst.iterator().next())
// console.log(arrLst.toArray())
// console.log(arrLst.toString())
// arrLst.clear();
// console.log(arrLst.isEmpty())
// console.log(arrLst.add(1))
// console.log(arrLst.isEmpty())

console.log(ArrayList.listToArray({ value: 1, rest: { value: 2, rest: { value: 3 } } }))
console.log(ArrayList.arrayToList([1,2,3,]));

export { Stack, Queue, ArrayList };
