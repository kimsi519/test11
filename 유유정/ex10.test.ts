import assert from "assert";
import { ArrayList } from './ex10';
console.log('🚀  ArrayList:', ArrayList);

// 여기에 테스트코드를 작성하세요.
function testArrayList() {
    const alist = new ArrayList(...[1, 2]);

    assert.strictEqual(alist.size, 2);
    assert.deepStrictEqual(alist.toArray(), [1, 2]);

    alist.add(3);
    assert.deepStrictEqual(alist.toArray(), [1, 2, 3]);

    alist.add(5, 1); 
    assert.deepStrictEqual(alist.toArray(), [1, 5, 2, 3]);


    alist.remove(2);
    assert.deepStrictEqual(alist.toArray(), [1, 5, 3]);

    alist.add(22, 1);
    alist.add(33, 1);
    assert.deepStrictEqual(alist.toArray(), [1, 33, 22, 5, 3]);

    alist.set(1, 300);
    assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3]);

    assert.strictEqual(alist.get(2), 22);

    assert.strictEqual(alist.size, 5);
    assert.strictEqual(alist.indexOf(300), 1);

    assert.strictEqual(alist.contains(300), true);
    assert.strictEqual(alist.contains(301), false);


    assert.strictEqual(alist.isEmpty, false);
    assert.strictEqual(alist.peek, 3);

    assert.deepStrictEqual(alist.toArray(), [1, 300, 22, 5, 3]);

    const iterator = alist.iterator();
    assert.deepStrictEqual(iterator.next(), { value: 1, done: false });


    alist.clear();
    assert.strictEqual(alist.size, 0);
    assert.strictEqual(alist.isEmpty, true);

    console.log("ArrayList 테스트 통과");
}

testArrayList();