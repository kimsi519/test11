// function deepCopy(obj) {}

// module.exports = { deepCopy };

function deepCopy(obj, map = new WeakMap()) {
    // 기본 타입 (null, undefined, number, string, boolean, symbol, function)은 그냥 반환
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    // 이미 복사한 객체를 다시 만나면 순환 참조 문제 해결
    if (map.has(obj)) {
      return map.get(obj);
    }
  
    // 복사할 객체가 Array일 경우
    if (Array.isArray(obj)) {
      const copy = [];
      map.set(obj, copy);
      obj.forEach((item, index) => {
        copy[index] = deepCopy(item, map);
      });
      return copy;
    }
  
    // 복사할 객체가 Set일 경우
    if (obj instanceof Set) {
      const copy = new Set();
      map.set(obj, copy);
      obj.forEach(item => {
        copy.add(deepCopy(item, map));
      });
      return copy;
    }
  
    // 복사할 객체가 Map일 경우
    if (obj instanceof Map) {
      const copy = new Map();
      map.set(obj, copy);
      obj.forEach((value, key) => {
        copy.set(deepCopy(key, map), deepCopy(value, map));
      });
      return copy;
    }
  
    // WeakSet은 깊은 복사 대신 새로 생성 (WeakSet은 요소를 순회할 수 없음)
    if (obj instanceof WeakSet) {
      const copy = new WeakSet();
      map.set(obj, copy);
      // WeakSet은 순회 불가, 새로 빈 WeakSet을 반환
      return copy;
    }
  
    // WeakMap은 깊은 복사 대신 새로 생성 (WeakMap은 요소를 순회할 수 없음)
    if (obj instanceof WeakMap) {
      const copy = new WeakMap();
      map.set(obj, copy);
      // WeakMap은 순회 불가, 새로 빈 WeakMap을 반환
      return copy;
    }
  
    // 일반 객체의 경우
    const copy = Object.create(Object.getPrototypeOf(obj));
    map.set(obj, copy);
    
    Reflect.ownKeys(obj).forEach(key => {
      copy[key] = deepCopy(obj[key], map);
    });
  
    return copy;
  }
  
  module.exports = { deepCopy };
  