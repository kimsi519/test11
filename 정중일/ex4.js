function deepCopy(obj) {
  const newObj = {};
  for (const name of Reflect.ownKeys(obj)) {
    let value = obj[name];

    if (!value) {
      newObj[name] = value;
      continue;
    }

    if (
      value instanceof Set ||
      value instanceof WeakSet ||
      value instanceof Map ||
      value instanceof WeakMap
    ) {
      newObj[name] = value;
    } else if (Array.isArray(value)) {
      const arr = [];
      for (const v of value) {
        if (Array.isArray(v)) {
          arr.push([...v]);
        } else if (typeof v === "object") {
          arr.push({ ...v });
        } else {
          arr.push(v);
        }
      }
      newObj[name] = arr;
    } else if (typeof value === "object") {
      newObj[name] = deepCopy(value);
    } else {
      newObj[name] = value;
    }
  }
  return newObj;
}
module.exports = { deepCopy };
