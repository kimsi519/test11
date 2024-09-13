
function deepCopy(obj) {

  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (Array.isArray(obj)) {
      return obj.map(deepCopy);
  }

  const type = Object.prototype.toString.call(obj);

  if (type === '[object Object]') {
      const copy = {};

      // Copy all own properties
      Object.keys(obj).forEach(key => {
          copy[key] = deepCopy(obj[key]);
      });

      // Copy symbol properties
      Object.getOwnPropertySymbols(obj).forEach(symbol => {
          copy[symbol] = deepCopy(obj[symbol]);
      });

      return copy;
  }

  if (type === '[object Set]') {
      const copy = new Set();
      obj.forEach(value => {
          copy.add(deepCopy(value)); 
      });
      return copy;
  }

  if (type === '[object Map]') {
      const copy = new Map();
      obj.forEach((value, key) => {
          copy.set(deepCopy(key), deepCopy(value));
      });
      return copy;
  }

  if (type === '[object Date]') {
      return new Date(obj.getTime());
  }

  if (type === '[object WeakSet]' || type === '[object WeakMap]') {
      return obj; // Cannot deep copy WeakSet and WeakMap
  }

  throw new Error('Unsupported data type');
}

module.exports = { deepCopy };
