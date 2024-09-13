function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime());
    }

    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }

    if (obj instanceof Set) {
        const newSet = new Set();
        obj.forEach(value => {
            newSet.add(deepCopy(value));
        });
        return newSet;
    }

    if (obj instanceof Map) {
        const newMap = new Map();
        obj.forEach((value, key) => {
            newMap.set(deepCopy(key), deepCopy(value));
        });
        return newMap;
    }

    if (obj instanceof WeakSet || obj instanceof WeakMap) {
        return obj;
    }

    const newObj = {};
    Object.keys(obj).forEach(key => {
        newObj[key] = deepCopy(obj[key]);
    });

    const symbols = Object.getOwnPropertySymbols(obj);
    symbols.forEach(symbol => {
        newObj[symbol] = deepCopy(obj[symbol]);
    });

    const methods = Object.getOwnPropertyNames(obj).filter(key => typeof obj[key] === 'function');
    methods.forEach(key => {
        newObj[key] = obj[key];
    });

    return newObj;
}

module.exports = { deepCopy };