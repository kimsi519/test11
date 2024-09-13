import assert from 'assert';
import { ArrayList } from './ex10';

// Helper function to convert object to pretty JSON string for assertion
function toJSONString(obj: any): string {
  return JSON.stringify(obj, null, 2);
}

async function runTests(alist: ArrayList<number>) {
  
  // toString() test
  assert.strictEqual(alist.toString(), toJSONString({ value: 1, rest: { value: 2 } }));

  // add() test
  alist.add(1); 
  assert.strictEqual(alist.toString(), toJSONString({ value: 1, rest: { value: 2, rest: { value: 1 } } }));
  
  alist.add(5, 1);
  alist.add(6, 1); //1 6 5 2 1
  
  // removeByIndex
  assert.deepStrictEqual(alist.removeByIndex(1), [1, 5, 2, 1]);
  assert.strictEqual(alist.toString(), toJSONString({ value: 1, rest: { value: 5, rest: { value: 2, rest: { value: 1 } } } }));

  // get
  assert.strictEqual(alist.get(2), 2);
  
  // remove
  assert.deepStrictEqual(alist.remove(1), [5, 2]);
  assert.strictEqual(alist.toString(), toJSONString({ value: 5, rest: { value: 2 } }));
  
  // Add more elements
  alist.add(3);
  assert.strictEqual(alist.toString(), toJSONString({ value: 5, rest: { value: 2, rest: { value: 3 } } }));

  // 
  assert.strictEqual(alist.size(), 3); //size
  assert.strictEqual(alist.indexOf(300), -1); //indexOf
  assert.strictEqual(alist.contains(300), false); //contains
  assert.strictEqual(alist.contains(5), true); 
  assert.strictEqual(alist.isEmpty(), false); //isEmpty
  assert.strictEqual(alist.peek(), 3); //peek
  assert.deepStrictEqual(alist.toArray(), [5, 2, 3]); //toArray



  //iterator
  let iterator = alist.iterator();
  assert.deepStrictEqual(iterator.next(), { value: 5, done: false });
  assert.deepStrictEqual(iterator.next(), { value: 2, done: false });
  assert.deepStrictEqual(iterator.next(), { value: 3, done: false });
  assert.deepStrictEqual(iterator.next(), { value: undefined, done: true });

  //set
  alist.set(1,300);
  assert.strictEqual(alist.toString(), toJSONString({ value: 5, rest: { value: 300, rest: { value: 3} } }));

  // clear
  alist.clear();
  assert.strictEqual(alist.toString(), toJSONString(undefined));
}


const alist = new ArrayList([1, 2]);


runTests(alist).then(() => {
  console.log('🚀 테스트 통과');
}).catch((error) => {
  console.error('테스트 실패', error);
});
