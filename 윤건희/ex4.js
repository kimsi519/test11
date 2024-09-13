function deepCopy(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') 
    return obj;
  
  if (map.has(obj))
    return map.get(obj);

  const type = Object.prototype.toString.call(obj);
  let copy;

  if (Array.isArray(obj)) {
    //배열 복사
    copy = [];
    map.set(obj, copy);
    obj.forEach(item => copy.push(deepCopy(item, map)));
  }
  else if (type === '[object Map]') {
    //Map 복사
    copy = new Map();
    map.set(obj, copy);
    obj.forEach((value, key) => copy.set(deepCopy(key, map), deepCopy(value, map)));
  }
  else if (type === '[object Set]') {
    //Set 복사
    copy = new Set();
    map.set(obj, copy);
    obj.forEach(item => copy.add(deepCopy(item, map)));
  }
  else if (type === '[object WeakMap]') {
    //WeakMap 복사
    copy = new WeakMap();
    map.set(obj, copy);
  }
  else if (type === '[object WeakSet]') {
    // WeakSet 복사
    copy = new WeakSet();
    map.set(obj, copy);
  }
  else if (type === '[object Date]') {
    //Date 복사
    copy = new Date(obj.getTime());
  }
  else if (type === '[object RegExp]') {
    //RegExp 복사
    copy = new RegExp(obj);
  }
  else {
    //일반객체 복사
    copy = Object.create(Object.getPrototypeOf(obj));
    map.set(obj, copy);
    Object.keys(obj).forEach(key => copy[key] = deepCopy(obj[key], map));
    Object.getOwnPropertySymbols(obj).forEach(symbol => copy[symbol] = deepCopy(obj[symbol], map));
  }

  return copy;
}

module.exports = { deepCopy };
