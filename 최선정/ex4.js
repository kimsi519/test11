function deepCopy(obj, hash = new WeakMap()) {
  // null이나 원시 값인 경우 그대로 반환
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 순환 참조 방지
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  // Date 객체 복사
  if (obj instanceof Date) {
    return new Date(obj);
  }

  // RegExp 객체 복사
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }

  // Set 객체 복사
  if (obj instanceof Set) {
    const copy = new Set();
    obj.forEach((value) => {
      copy.add(deepCopy(value, hash));
    });
    return copy;
  }

  // Map 객체 복사
  if (obj instanceof Map) {
    const copy = new Map();
    obj.forEach((value, key) => {
      copy.set(deepCopy(key, hash), deepCopy(value, hash));
    });
    return copy;
  }

  // WeakSet 객체 복사: 열거할 수 없으므로 새로운 WeakSet 생성
  if (obj instanceof WeakSet) {
    return new WeakSet();
  }

  // WeakMap 객체 복사: 열거할 수 없으므로 새로운 WeakMap 생성
  if (obj instanceof WeakMap) {
    return new WeakMap();
  }

  // 새로운 객체 또는 배열을 생성
  const copy = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));

  // 순환 참조 해결을 위해 현재 객체를 해시맵에 저장
  hash.set(obj, copy);

  // 객체의 키를 얻어서 재귀적으로 깊은 복사
  for (const key of Reflect.ownKeys(obj)) {
    copy[key] = deepCopy(obj[key], hash);
  }

  return copy;
}

module.exports = { deepCopy };
