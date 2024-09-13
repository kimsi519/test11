import { ArrayList } from './ex10';
import assert from 'assert';
console.log('🚀  ArrayList:', ArrayList);

// 여기에 테스트코드를 작성하세요.
const arrlst = new ArrayList<Number>([1,2,3])
assert.deepStrictEqual(arrlst.toArray(), [1,2,3]);