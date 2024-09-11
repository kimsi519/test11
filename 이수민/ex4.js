function deepCopy(obj) {
  // 0번 케이스: obj가 null이나 원시 타입인 경우
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 1번 케이스: obj가 배열인 경우
  if (Array.isArray(obj)) {
    return obj.map((item) => deepCopy(item));
  }

  // 2번 케이스: obj가 Set인 경우
  if (obj instanceof Set) {
    const copy = new Set();
    obj.forEach((value) => copy.add(deepCopy(value)));
    return copy;
  }

  // 3번 케이스: obj가 Map인 경우
  if (obj instanceof Map) {
    // Map을 복사
    const copy = new Map();
    obj.forEach((value, key) => copy.set(deepCopy(key), deepCopy(value)));
    return copy;
  }

  // 4번 케이스: obj가 WeakSet인 경우
  if (obj instanceof WeakSet) {
    // WeakSet은 복사할 수 없습니다 (WeakSet은 약한 참조만 저장)
    return new WeakSet(); // 빈 WeakSet 반환
  }

  // 5번 케이스: obj가 WeakMap인 경우
  if (obj instanceof WeakMap) {
    // WeakMap은 복사할 수 없습니다 (WeakMap은 약한 참조만 저장)
    return new WeakMap(); // 빈 WeakMap 반환
  }

  // 6번 케이스: obj가 그냥 객체인 경우
  if (obj instanceof Object) {
    const copy = {};
    Object.keys(obj).forEach((key) => {
      // 심볼 속성도 복사
      const value = obj[key];
      copy[key] = deepCopy(value);
    });

    // obj의 심볼 속성도 복사
    const symbols = Object.getOwnPropertySymbols(obj);
    symbols.forEach((symbol) => {
      copy[symbol] = deepCopy(obj[symbol]);
    });
    return copy;
  }
}

module.exports = { deepCopy };
