function deepCopy(obj, map = new WeakMap()) {
    
  // 기본 타입 (null, undefined, number, string, boolean, symbol, function)은 그냥 반환
  // 기본 타입은 깊은 복사할 필요가 없음
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    // 객체가 이미 복사된 적 있는 경우
    // 재참조를 방지하기 위해 WeakMap 통한 복사 객체 추적
    // 만약 WeakMap에 객체가 있다면, 복사된 객체를 반환하여 무한 순환 참조 방지
    if (map.has(obj)) {
      return map.get(obj);
    }
  
    // 복사할 객체가 Array일 경우
    // 새로운 배열을 생성한 후
    // 각 요소를 deepCopy하여 추가
    if (Array.isArray(obj)) {
      const copy = [];
      map.set(obj, copy);
      obj.forEach((item, index) => {
        copy[index] = deepCopy(item, map);
      });
      return copy;
    }
  
    // 복사할 객체가 Set일 경우
    // 새로운 셋을 생성한 후
    // 각 요소를 deepCopy하여 추가
    if (obj instanceof Set) {
      const copy = new Set();
      map.set(obj, copy);
      obj.forEach(item => {
        copy.add(deepCopy(item, map));
      });
      return copy;
    }
  
    // 복사할 객체가 Map일 경우
    // 새로운 맵을 생성한 후
    // 각 key, value를를 deepCopy하여 추가
    if (obj instanceof Map) {
      const copy = new Map();
      map.set(obj, copy);
      obj.forEach((value, key) => {
        copy.set(deepCopy(key, map), deepCopy(value, map));
      });
      return copy;
    }
  
    // WeakSet은 깊은 복사 대신 새로 생성 
    if (obj instanceof WeakSet) {
      const copy = new WeakSet();
      map.set(obj, copy);

      // WeakSet은 순회 불가하므로, 새로 빈 WeakSet을 반환해야함
      return copy;
    }
  
    // WeakMap은 깊은 복사 대신 새로 생성 
    if (obj instanceof WeakMap) {
      const copy = new WeakMap();
      map.set(obj, copy);

      // WeakMap은 순회 불가하므로, 새로 빈 WeakMap을 반환해야함
      return copy;
    }
  
    // 일반 객체의 경우
    // 객체 프로토타입은 유지, 새 객체 생성
    // 그 후 모든 속성을 deep Copy한 다음에 새 객체에 할당
    const copy = Object.create(Object.getPrototypeOf(obj));
    map.set(obj, copy);
    Reflect.ownKeys(obj).forEach(key => {
      copy[key] = deepCopy(obj[key], map);
    });
  
    return copy;
  }
  
  module.exports = { deepCopy };
  