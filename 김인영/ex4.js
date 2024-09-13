function deepCopy(obj) {
    if (obj === null || typeof obj !== "object") {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof Set) {
        return new Set([...obj].map(item => deepCopy(item)));
    }

    if (obj instanceof Map) {
        return new Map([...obj.entries()].map(([key, value]) => [deepCopy(key), deepCopy(value)]));
    }

    // WeakSet과 WeakMap은 복사하지 않고 원본을 반환
    if (obj instanceof WeakSet || obj instanceof WeakMap) {
        return obj;
    }

    const copiedObj = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copiedObj[key] = deepCopy(obj[key]);
        }
    }

    const symbolKeys = Object.getOwnPropertySymbols(obj);
    symbolKeys.forEach(symbol => {
        copiedObj[symbol] = deepCopy(obj[symbol]);
    });

    return copiedObj;
}

module.exports = { deepCopy };
