function deepCopy(obj, hash = new WeakMap()) {
  // 기본 타입 (null, undefined, number, string, boolean 등) 처리
  if (obj === null || typeof obj !== "object") return obj;

  // 순환 참조 처리
  if (hash.has(obj)) return hash.get(obj);

  // 배열 복사
  if (Array.isArray(obj)) {
    const arrCopy = [];
    hash.set(obj, arrCopy);
    obj.forEach((item, index) => {
      arrCopy[index] = deepCopy(item, hash);
    });
    return arrCopy;
  }

  // Set 복사
  if (obj instanceof Set) {
    const setCopy = new Set();
    hash.set(obj, setCopy);
    obj.forEach((value) => {
      setCopy.add(deepCopy(value, hash));
    });
    return setCopy;
  }

  // Map 복사
  if (obj instanceof Map) {
    const mapCopy = new Map();
    hash.set(obj, mapCopy);
    obj.forEach((value, key) => {
      mapCopy.set(deepCopy(key, hash), deepCopy(value, hash));
    });
    return mapCopy;
  }

  // WeakSet과 WeakMap은 복사하지 않고 그대로 반환
  if (obj instanceof WeakSet || obj instanceof WeakMap) {
    return obj;
  }

  // 일반 객체 복사 (함수 포함)
  const objCopy = Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, objCopy);

  // 객체의 속성 (심볼 포함) 복사
  Object.getOwnPropertyNames(obj).forEach((key) => {
    objCopy[key] = deepCopy(obj[key], hash);
  });
  Object.getOwnPropertySymbols(obj).forEach((sym) => {
    objCopy[sym] = deepCopy(obj[sym], hash);
  });

  return objCopy;
}

module.exports = { deepCopy };
