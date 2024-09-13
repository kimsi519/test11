function deepCopy(obj, map = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
      // 기본 타입(숫자, 문자열 등) 또는 null 처리
      return obj;
    }
  
    // 이미 복사된 객체인 경우, 순환 참조 방지를 위해 맵에서 반환
    if (map.has(obj)) {
      return map.get(obj);
    }
  
    // 배열 처리
    if (Array.isArray(obj)) {
      const arrCopy = [];
      map.set(obj, arrCopy);
      for (const item of obj) {
        arrCopy.push(deepCopy(item, map));
      }
      return arrCopy;
    }
  
    // Set 처리
    if (obj instanceof Set) {
      const setCopy = new Set();
      map.set(obj, setCopy);
      for (const item of obj) {
        setCopy.add(deepCopy(item, map));
      }
      return setCopy;
    }
  
    // WeakSet 처리
    if (obj instanceof WeakSet) {
      // WeakSet은 복사할 수 없으므로 빈 WeakSet을 반환합니다.
      return new WeakSet();
    }
  
    // Map 처리
    if (obj instanceof Map) {
      const mapCopy = new Map();
      map.set(obj, mapCopy);
      for (const [key, value] of obj) {
        mapCopy.set(deepCopy(key, map), deepCopy(value, map));
      }
      return mapCopy;
    }
  
    // WeakMap 처리
    if (obj instanceof WeakMap) {
      // WeakMap은 복사할 수 없으므로 빈 WeakMap을 반환합니다.
      return new WeakMap();
    }
  
    // 객체 처리
    const objCopy = {};
    map.set(obj, objCopy);
    for (const key of Object.keys(obj)) {
      objCopy[key] = deepCopy(obj[key], map);
    }
  
    // Symbol 속성 처리
    const symbols = Object.getOwnPropertySymbols(obj);
    for (const sym of symbols) {
      objCopy[sym] = deepCopy(obj[sym], map);
    }
  
    return objCopy;
  }
  
  module.exports = { deepCopy };
  