import assert from 'assert';
import { ArrayList } from './ex10';
console.log('🚀  ArrayList:', ArrayList);

const al = new ArrayList();

al.add(2)
al.add(3)
assert.deepStrictEqual(al, {value : 1, rest : null})

// 여기에 테스트코드를 작성하세요.
