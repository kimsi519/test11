function deepCopy(obj) {
    // 기본 데이터 타입은 그대로 반환
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Date 객체는 직접 복사
    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    // RegExp 객체는 직접 복사
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    // Array 객체는 배열을 복사
    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }

    // Set 객체는 Set을 복사
    if (obj instanceof Set) {
        const newSet = new Set();
        obj.forEach(value => {
            newSet.add(deepCopy(value));
        });
        return newSet;
    }

    // Map 객체는 Map을 복사
    if (obj instanceof Map) {
        const newMap = new Map();
        obj.forEach((value, key) => {
            newMap.set(deepCopy(key), deepCopy(value));
        });
        return newMap;
    }

    // WeakSet 및 WeakMap은 복사할 수 없으므로, 빈 객체를 반환하거나 원본을 반환
    if (obj instanceof WeakSet || obj instanceof WeakMap) {
        return obj;
    }

    // 일반 객체는 객체의 모든 속성을 재귀적으로 복사
    const newObj = {};
    Object.keys(obj).forEach(key => {
        newObj[key] = deepCopy(obj[key]);
    });

    // Symbol 속성 복사
    const symbols = Object.getOwnPropertySymbols(obj);
    symbols.forEach(symbol => {
        newObj[symbol] = deepCopy(obj[symbol]);
    });

    // 메서드(함수)도 복사
    const methodKeys = Object.getOwnPropertyNames(obj).filter(key => typeof obj[key] === 'function');
    methodKeys.forEach(key => {
        newObj[key] = obj[key];
    });

    return newObj;
}

module.exports = { deepCopy };