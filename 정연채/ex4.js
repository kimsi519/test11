function objectCopy(obj, wm) {
  const objCopy = Object.create(Object.getPrototypeOf(obj));
  wm.set(obj, objCopy);

  
  Object.getOwnPropertyNames(obj).forEach((key) => {
    objCopy[key] = deepCopy(obj[key], wm);
  });

  Object.getOwnPropertySymbols(obj).forEach((sym) => {
    objCopy[sym] = deepCopy(obj[sym], wm);
  });

  return objCopy;
}

function arrayCopy(arr, wm) {
  const arrCopy = [];
  wm.set(arr, arrCopy);
  arr.forEach((item, index) => {
    arrCopy[index] = deepCopy(item, wm);
  });
  return arrCopy;
}

function setCopy(set, wm) {
  const setCopy = new Set();
  wm.set(set, setCopy);
  set.forEach((value) => {
    setCopy.add(deepCopy(value, wm));
  });
  return setCopy;
}

function mapCopy(map, wm) {
  const mapCopy = new Map();
  wm.set(map, mapCopy);
  map.forEach((value, key) => {
    mapCopy.set(deepCopy(key, wm), deepCopy(value, wm));
  });
  return mapCopy;
}

function deepCopy(obj, wm = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;

  if (wm.has(obj)) return wm.get(obj);

  if (Array.isArray(obj)) 
    return arrayCopy(obj, wm); 
  if (obj instanceof Set) 
    return setCopy(obj, wm);
  if (obj instanceof Map) 
    return mapCopy(obj, wm);
  if (obj instanceof WeakSet || obj instanceof WeakMap) 
    return obj; 

  return objectCopy(obj, wm); 
}

module.exports = { deepCopy };
