function deepCopy(obj, seen = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    if (seen.has(obj)) {
      return seen.get(obj);
    }
  
    if (Array.isArray(obj)) {
      const arrCopy = [];
      seen.set(obj, arrCopy);
      obj.forEach((item, index) => {
        arrCopy[index] = deepCopy(item, seen);
      });
      return arrCopy;
    }
  
    if (obj instanceof Map) {
      const mapCopy = new Map();
      seen.set(obj, mapCopy);
      obj.forEach((value, key) => {
        mapCopy.set(deepCopy(key, seen), deepCopy(value, seen));
      });
      return mapCopy;
    }

    if (obj instanceof WeakMap) {
      const weakMapCopy = new WeakMap();
      seen.set(obj, weakMapCopy);
      return weakMapCopy;
    }
  
    if (obj instanceof Set) {
      const setCopy = new Set();
      seen.set(obj, setCopy);
      obj.forEach(value => {
        setCopy.add(deepCopy(value, seen));
      });
      return setCopy;
    }
  
    if (obj instanceof WeakSet) {
      const weakSetCopy = new WeakSet();
      seen.set(obj, weakSetCopy);
      return weakSetCopy;
    }
  
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
  
    if (obj instanceof RegExp) {
      return new RegExp(obj.source, obj.flags);
    }
  
    if (typeof obj === 'function') {
      return obj;
    }
  
    if (typeof obj === 'symbol') {
      return Symbol(obj.description);
    }
  
    const objCopy = {};
    seen.set(obj, objCopy);
    for (const key of Object.keys(obj)) {
      objCopy[key] = deepCopy(obj[key], seen);
    }
  
    for (const sym of Object.getOwnPropertySymbols(obj)) {
      objCopy[sym] = deepCopy(obj[sym], seen);
    }
  
    return objCopy;
  }
  
  const arr = [1, 2, 3];
  const hong = { id: 1, name: 'Hong', city: 'Busan', dept: 1 };
  
  const kim = {
    nid: 3,
    addr: 'Pusan',
    arr: [1, 2, 3, { aid: 1 }, [10, 20]],
    oo: { id: 1, name: 'Hong', addr: { city: 'Seoul' } }, xx: null,
    yy: function() { console.log(this.oo); },
    yyy() { console.log(this.oo); },
    [Symbol()]: 9,
    [Symbol()]: Symbol('symbol2'),
    zs: new Set([arr, hong]),
    zws: new WeakSet([arr, hong]), zm: new Map([[hong, arr]]),
    zwm: new WeakMap([[hong, arr]]),
};
  
const deepCopiedKim = deepCopy(kim);
console.log(deepCopiedKim);

module.exports = { deepCopy };
