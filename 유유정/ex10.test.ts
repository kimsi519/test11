import assert from "assert";
import { ArrayList } from './ex10';
console.log('🚀  ArrayList:', ArrayList);

// 여기에 테스트코드를 작성하세요.
function testArrayList() {
    const arrayList = new ArrayList<number>();
    
    // add 테스트
    arrayList.add(1);
    arrayList.add(2);
    arrayList.add(3);
    assert.deepStrictEqual(arrayList.toArray(), [1, 2, 3]);

    // add (with index) 테스트
    arrayList.add(4, 1);
    assert.deepStrictEqual(arrayList.toArray(), [1, 4, 2, 3]);

    // get 테스트
    assert.strictEqual(arrayList.get(1), 4);

    // set 테스트
    arrayList.set(1, 5);
    assert.strictEqual(arrayList.get(1), 5);

    // contains 테스트
    assert.strictEqual(arrayList.contains(5), true);
    assert.strictEqual(arrayList.contains(10), false);

    // indexOf 테스트
    assert.strictEqual(arrayList.indexOf(5), 1);
    assert.strictEqual(arrayList.indexOf(10), -1);

    // removeByIndex 테스트
    arrayList.removeByIndex(1);
    assert.deepStrictEqual(arrayList.toArray(), [1, 2, 3]);

    // size 테스트
    assert.strictEqual(arrayList.size(), 3);

    // clear 테스트
    arrayList.clear();
    assert.strictEqual(arrayList.isEmpty, true);

    console.log("ArrayList 테스트 통과");
}

testArrayList();