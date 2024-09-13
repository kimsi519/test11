function deepCopy(obj, references = new WeakMap()) {

    // 기본형이거나 함수일 경우, 그대로 반환
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    
    // 이미 참조한 객체가 있을 경우, 복사된 객체를 반환
    if (references.has(obj)) {
        return references.get(obj);
    }

    // 배열일 경우
    if (Array.isArray(obj)) {
        const copy = [];
        references.set(obj, copy); // 원본 객체 저장

        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i], references);
        }
        return copy;
    }
    
    // Set일 경우
    if (obj instanceof Set) {
        const copy = new Set();
        references.set(obj, copy);  // 원본 객체랑 복사본을 WeakSet에 저장
        for (let item of obj) {
            copy.add(deepCopy(item, references));  // 각 값을 재귀적으로 복사
        }
        return copy;
    }

    // Map일 경우
    if (obj instanceof Map) {
        const copyMap = new Map();
        references.set(obj, copyMap);  // 원본 객체랑 복사본을 WeakMap에 저장
        for (let [key, value] of obj) {
            copyMap.set(deepCopy(key, references), deepCopy(value, references));  // 키-값을 재귀적으로 복사
        }
        return copyMap;
    }
    
    // WeakSet과 WeakMap일 경우, 그대로 반환 (참조형)
    if (obj instanceof WeakSet || obj instanceof WeakMap) {
        return obj;
    }

    // 일반 객체일 경우
    const result = {};
    references.set(obj, result);  // 원본 객체를 WeakMap에 저장

    // 1) 객체의 심볼 속성 복사
    const symbols = Object.getOwnPropertySymbols(obj);
    for (let i = 0; i < symbols.length; i++) {
        const symbol = symbols[i];
        result[symbol] = deepCopy(obj[symbol], references);
    }

    // 2) 객체의 일반 속성 복사
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            result[key] = deepCopy(obj[key], references);
        }
    }
    return result;
}

module.exports = { deepCopy };