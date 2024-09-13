import { ArrayList } from './ex10';

describe('ArrayList Tests', () => {
  test('listToArray converts linked list to array', () => {
    const result = ArrayList.listToArray({ value: 1, rest: { value: 2 } });
    expect(result).toEqual([1, 2]);
  });

  test('arrayToList converts array to linked list', () => {
    const result = ArrayList.arrayToList([1, 2]);
    expect(result).toEqual({ value: 1, rest: { value: 2 } });
  });

  test('ArrayList initialization', () => {
    const alist = new ArrayList([1, 2]);
    expect(alist.toString()).toEqual(JSON.stringify({ value: 1, rest: { value: 2 } }, null, 2));
  });

  test('add value to ArrayList', () => {
    const alist = new ArrayList([1, 2]);
    alist.add(3);
    expect(alist.toString()).toEqual(JSON.stringify({ value: 1, rest: { value: 2, rest: { value: 3 } } }, null, 2));
  });

  test('add value at specific index', () => {
    const alist = new ArrayList([1, 2]);
    alist.add(5, 1);
    expect(alist.toString()).toEqual(JSON.stringify({ value: 1, rest: { value: 5, rest: { value: 2 } } }, null, 2));
  });

  test('remove value from ArrayList', () => {
    const alist = new ArrayList([1, 2, 3]);
    alist.remove(2);
    expect(alist.toString()).toEqual(JSON.stringify({ value: 1, rest: { value: 3 } }, null, 2));
  });

  test('set value at specific index', () => {
    const alist = new ArrayList([1, 2, 3]);
    alist.set(1, 300);
    expect(alist.toString()).toEqual(JSON.stringify({ value: 1, rest: { value: 300, rest: { value: 3 } } }, null, 2));
  });

  test('get value at specific index', () => {
    const alist = new ArrayList([1, 2, 3]);
    expect(alist.get(2)).toBe(3);
  });

  test('indexOf value', () => {
    const alist = new ArrayList([1, 2, 3]);
    expect(alist.indexOf(2)).toBe(1);
  });

  test('contains value', () => {
    const alist = new ArrayList([1, 2, 3]);
    expect(alist.contains(2)).toBe(true);
    expect(alist.contains(4)).toBe(false);
  });

  test('check isEmpty', () => {
    const alist = new ArrayList();
    expect(alist.isEmpty).toBe(true);
  });

  test('peek value', () => {
    const alist = new ArrayList([1, 2, 3]);
    expect(alist.peek).toBe(3);
  });

  test('toArray', () => {
    const alist = new ArrayList([1, 2, 3]);
    expect(alist.toArray()).toEqual([1, 2, 3]);
  });

  test('clear ArrayList', () => {
    const alist = new ArrayList([1, 2, 3]);
    alist.clear();
    expect(alist.isEmpty).toBe(true);
  });
});
