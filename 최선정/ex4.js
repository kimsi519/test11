function deepCopy(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  if (hash.has(obj)) {
    return hash.get(obj);
  }
  if (obj instanceof Date) {
    return new Date(obj);
  }
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  if (obj instanceof Set) {
    const copy = new Set();
    obj.forEach((value) => {
      copy.add(deepCopy(value, hash));
    });
    return copy;
  }
  if (obj instanceof Map) {
    const copy = new Map();
    obj.forEach((value, key) => {
      copy.set(deepCopy(key, hash), deepCopy(value, hash));
    });
    return copy;
  }
  if (obj instanceof WeakSet) {
    return new WeakSet();
  }
  if (obj instanceof WeakMap) {
    return new WeakMap();
  }
  const copy = Array.isArray(obj)
    ? []
    : Object.create(Object.getPrototypeOf(obj));

  hash.set(obj, copy);

  for (const key of Reflect.ownKeys(obj)) {
    copy[key] = deepCopy(obj[key], hash);
  }

  return copy;
}

module.exports = { deepCopy };
