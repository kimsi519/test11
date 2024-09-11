function deepCopy(obj) {
  return {
    ...obj,
    arr: JSON.parse(JSON.stringify(obj.arr)),
    oo: JSON.parse(JSON.stringify(obj.oo)),
  };
}

module.exports = { deepCopy };
