function deepCopy(obj) {
    //반환값들
    if (obj === null || typeof obj !== "object") {
        return obj;
    }
    if (obj instanceof WeakSet || obj instanceof WeakMap) {
        return obj;  
    }
    
    if (obj instanceof Set) {
        return new Set([...obj].map(item => deepCopy(item)));
    }

    
    if (obj instanceof Map) {
        return new Map([...obj].map(([key, value]) => [deepCopy(key), deepCopy(value)]));
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }
    //복사 시작
    let copy = {};

    for (let key of Object.keys(obj)) {
        copy[key] = deepCopy(obj[key]);
    }
    
    for (let key2 of Object.getOwnPropertySymbols(obj)) {
        copy[key2] = deepCopy(obj[key2]);
    }

    return copy;
}

module.exports = { deepCopy };
