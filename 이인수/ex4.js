function deepCopy(obj) {
  // null 혹은 object 타입이 아닌 경우
  if (!obj || typeof obj !== 'object') return obj;

  // 배열인 경우
  if (Array.isArray(obj)) {
    const newArr = [];
    for (const item of obj) {
      newArr.push(deepCopy(item));
    }
    return newArr;
  }

  // Set인 경우
  if (obj instanceof Set) {
    const newSet = new Set();
    for (const item of obj) {
      newSet.add(deepCopy(item));
    }
    return newSet;
  }

  // Map인 경우
  if (obj instanceof Map) {
    const newMap = new Map();
    for (const [key, value] of obj) {
      newMap.set(deepCopy(key), deepCopy(value));
    }
    return newMap;
  }

  // WeakSet인 경우: 불가능
  if (obj instanceof WeakSet) {
    const newWeakSet = new WeakSet();
    return newWeakSet;
  }

  // WeakMap인 경우: 불가능
  if (obj instanceof WeakMap) {
    const newWeakMap = new WeakMap();
    return newWeakMap;
  }

  const newObj = {};
  // 심볼을 포함하여 객체의 모든 키를 재귀적으로 깊은 복사 수행
  for (const key of Reflect.ownKeys(obj)) {
    newObj[key] = deepCopy(obj[key]);
  }

  return newObj;
}

module.exports = { deepCopy };
