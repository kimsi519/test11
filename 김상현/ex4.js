function deepCopy(obj, map = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (map.has(obj)) {
      return map.get(obj);
  }

  let copy;
  if (Array.isArray(obj)) {
      copy = [];
      map.set(obj, copy);
      for (const item of obj) {
          copy.push(deepCopy(item, map));
      }

  } else if (obj instanceof Set) {
      copy = new Set();
      map.set(obj, copy);
      for (const item of obj) {
          copy.add(deepCopy(item, map));
      }

  } else if (obj instanceof WeakSet) {
      copy = new WeakSet();
      map.set(obj, copy);

  } else if (obj instanceof Map) {
      copy = new Map();
      map.set(obj, copy);
      for (const [key, value] of obj) {
          copy.set(deepCopy(key, map), deepCopy(value, map));
      }

  } else if (obj instanceof WeakMap) {
      copy = new WeakMap();
      map.set(obj, copy);

  } else if (obj instanceof Function) {
      copy = obj.bind({});
      map.set(obj, copy);
  } 

  else {
      copy = {};
      map.set(obj, copy);
      for (const [key, value] of Object.entries(obj)) {
          copy[key] = deepCopy(value, map); // 재귀 진행
      }
      symbols = Object.getOwnPropertySymbols(obj); // Symbol은 따로 맨 마지막에 수행
      symbols.forEach(symbol => { // entries에 Symbol은 포함되지 않기 때문에
        copy[symbol] = obj[symbol];
      });
  }

  return copy;
}

module.exports = { deepCopy };
