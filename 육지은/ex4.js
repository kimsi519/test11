function deepCopy(obj) {
    // 기본 데이터 타입 및 null 처리
    if (obj === null || typeof obj !== 'object') {return obj;}

    // 배열 처리
    if (Array.isArray(obj)) {return obj.map(item => deepCopy(item));}

    // Set 처리
    if (obj instanceof Set) {
        return new Set([...obj].map(item => deepCopy(item)));
    }

    // WeakSet , WeakMap - 복사 불가능, 그대로 반환하기
    if (obj instanceof WeakSet) {return obj; }

    if (obj instanceof WeakMap) {return obj;}

    // Map 처리
    if (obj instanceof Map) {
        const newMap = new Map();
        obj.forEach((value, key) => {
            newMap.set(deepCopy(key), deepCopy(value));
        });
        return newMap;
    }

    // 객체 처리
    const newObj = {};
    Object.keys(obj).forEach(key => {
        newObj[key] = deepCopy(obj[key]);
    });

    // 프로토타입 복사
    Object.setPrototypeOf(newObj, Object.getPrototypeOf(obj));

    // Symbol 처리
    const symbols = Object.getOwnPropertySymbols(obj);
    symbols.forEach(sy => {
        newObj[sy] = deepCopy(obj[sy]);
    });

    return newObj;
}

module.exports = { deepCopy };
