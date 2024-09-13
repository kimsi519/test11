function deepCopy(obj) {
    if (obj === null || typeof obj !== 'object') { 
      return obj;
    }
  
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
  
    if (obj instanceof RegExp) {
      return new RegExp(obj.source, obj.flags);
    }
  
    if (obj instanceof Set) {
      const newSet = new Set();
      obj.forEach(value => newSet.add(deepCopy(value)));
      return newSet;
    }

    if (obj instanceof WeakSet) {
        return new WeakSet();
    }

    if (Array.isArray(obj)) {
        return obj.map(item => deepCopy(item));
    }
  
    if (obj instanceof Map) {
      const newMap = new Map();
      obj.forEach((value, key) => newMap.set(deepCopy(key), deepCopy(value)));
      return newMap;
    }
  
    if (obj instanceof WeakMap) {
      return new WeakMap();
    }
  
    const newObj = {};
    for (const key of Object.keys(obj)) {
      newObj[key] = deepCopy(obj[key]);
    }
  
    const symbols = Object.getOwnPropertySymbols(obj);
    for (const symbol of symbols) {
      newObj[symbol] = deepCopy(obj[symbol]);
    }
  
    Object.setPrototypeOf(newObj, Object.getPrototypeOf(obj));
  
    return newObj;
  }
  
  module.exports = { deepCopy };
  