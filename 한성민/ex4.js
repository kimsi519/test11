function deepCopy(obj, seen = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') return obj;

    if (seen.has(obj)) return seen.get(obj);  // 순환 참조 방지 (WeakMap을 사용해 처리)

    let copy;

    // 배열일 경우
    if (Array.isArray(obj)) {
        copy = [];
        seen.set(obj, copy);  // 순환 참조 방지 처리
        obj.forEach((value, index) => {
            copy[index] = deepCopy(value, seen);
        });
        return copy;
    }

    // Set일 경우
    if (obj instanceof Set) {
        copy = new Set();
        seen.set(obj, copy);
        obj.forEach(value => {
            copy.add(deepCopy(value, seen));
        });
        return copy;
    }

    // Map일 경우
    if (obj instanceof Map) {
        copy = new Map();
        seen.set(obj, copy);
        obj.forEach((value, key) => {
            copy.set(deepCopy(key, seen), deepCopy(value, seen));
        });
        return copy;
    }

    // 참조 기반인 WeakSet, WeakMap, 함수는 그대로 반환
    if (obj instanceof WeakSet || obj instanceof WeakMap || typeof obj === 'function') {
        return obj;
    }

    if (typeof obj === 'symbol') {
        return Symbol(obj.description);
    }

    // 일반 객체일 경우
    copy = {};
    seen.set(obj, copy);  // 순환 참조 방지 처리

    // 심볼 속성 복사
    const symKeys = Object.getOwnPropertySymbols(obj);
    symKeys.forEach(sym => {
        copy[sym] = deepCopy(obj[sym], seen);
    });

    // 나머지 속성 복사
    Object.keys(obj).forEach(key => {
        copy[key] = deepCopy(obj[key], seen);
    });

    return copy;
}

module.exports = { deepCopy };
