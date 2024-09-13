function deepCopy(obj, ref = new WeakMap()) {
  // 기본 타입 (null, undefined, number, string, boolean 등) 처리
  if (obj === null || typeof obj !== "object") return obj;

  // 순환 참조 처리
  if (ref.has(obj)) return ref.get(obj);

  // 새로운 객체 생성
  let copy;
  if (Array.isArray(obj)) {
    //배열
    copy = [];
    obj.forEach((item, index) => {
      copy[index] = deepCopy(item, ref);
    });
  } else if (obj instanceof Set) {
    //Set
    copy = new Set();
    obj.forEach((value) => {
      copy.add(deepCopy(value, ref));
    });
  } else if (obj instanceof Map) {
    //Map
    copy = new Map();
    obj.forEach((value, key) => {
      copy.set(deepCopy(key, ref), deepCopy(value, ref));
    });
  } else if (obj instanceof WeakSet || obj instanceof WeakMap) {
    // WeakSet과 WeakMap
    return obj;
  } else {
    // 일반 객체 (함수 포함)
    copy = Object.create(Object.getPrototypeOf(obj));
    Object.getOwnPropertyNames(obj).forEach((key) => {
      copy[key] = deepCopy(obj[key], ref);
    });
    Object.getOwnPropertySymbols(obj).forEach((sym) => {
      copy[sym] = deepCopy(obj[sym], ref);
    });
  }

  // 순환 참조 처리
  ref.set(obj, copy);
  return copy;
}

module.exports = { deepCopy };
