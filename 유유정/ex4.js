function deepCopy(obj) {
  
    // 기본 타입 및 null 처리
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 배열 처리
  if (Array.isArray(obj)) {
    return obj.map(item => deepCopy(item));
  }

  // Set 처리
  if (obj instanceof Set) {
    return new Set([...obj].map(item => deepCopy(item)));
  }

  // WeakSet 처리 (WeakSet은 복사할 수 없으므로 빈 WeakSet 반환)
  if (obj instanceof WeakSet) {
    return new WeakSet();
  }

  // Map 처리
  if (obj instanceof Map) {
    const newMap = new Map();
    obj.forEach((val, key) => {
      newMap.set(deepCopy(key), deepCopy(val));
    });
    return newMap;
  }

  // WeakMap 처리 (WeakMap은 복사할 수 없으므로 빈 WeakMap 반환)
  if (obj instanceof WeakMap) {
    return new WeakMap();
  }

  // 객체 처리
  const newObj = {};
  Object.keys(obj).forEach(key => {
    newObj[key] = deepCopy(obj[key]);
  });

  // Symbol 처리
  const symbols = Object.getOwnPropertySymbols(obj);
  symbols.forEach(symbol => {
    newObj[symbol] = deepCopy(obj[symbol]);
  });

  return newObj;

}

module.exports = { deepCopy };
