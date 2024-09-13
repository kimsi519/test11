import { ArrayList } from './ex10';
import assert from 'assert';
console.log('🚀  ArrayList:', ArrayList);

// 여기에 테스트코드를 작성하세요.
const testArrayList = () => {
    const list = new ArrayList<number>();

    const alist = new ArrayList<number>(1,2);
    console.log(alist.toString());
    alist.add(3);
    console.log(alist.toString());
    list.add(1);
    list.add(2);
    list.add(3);
    
    assert.strictEqual(list.size, 3);
    assert.deepStrictEqual(list.toArray(), [1, 2, 3]);

    list.add(1,4);
    assert.deepStrictEqual(list.toArray(), [1, 4, 2, 3]);

    assert.strictEqual(list.get(1), 4);
    assert.strictEqual(list.get(3), 3);

    list.remove(4);
    assert.deepStrictEqual(list.toArray(), [1,2,3]);

    list.removeByIndex(1);
    assert.deepStrictEqual(list.toArray(), [1, 3]);

    list.set(1, 5);
    assert.strictEqual(list.get(1), 5);

    assert.strictEqual(list.contains(1), true);
    assert.strictEqual(list.contains(10), false);

    assert.strictEqual(list.indexOf(1), 0);
    assert.strictEqual(list.indexOf(5), 1);

    assert.deepStrictEqual(list.toArray(), [1, 5]);

    assert.strictEqual(list.isEmpty, false);
    list.clear();
    assert.strictEqual(list.isEmpty, true);

    assert.strictEqual(list.size, 0);
    const listObject = { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } };
    assert.deepStrictEqual(ArrayList.listToArray(listObject), [1, 2, 3]);

    const array = [1, 2, 3];
    const tmpList = { value: 1, rest: { value: 2, rest: { value: 3, rest: null } } };
    assert.deepStrictEqual(ArrayList.arrayToList(array), tmpList);
};

testArrayList();
console.log("모든 테스트 통과!");