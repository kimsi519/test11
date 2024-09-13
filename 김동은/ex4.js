function deepCopy(obj) {
  return {
    // 객체의 나머지 속성들은 얕은 복사
    ...obj,
    // arr 속성은 JSON.stringify와 JSON.parse를 사용하여 깊은 복사
    arr: JSON.parse(JSON.stringify(obj.arr)),
    // oo 속성도 깊은 복사
    oo: JSON.parse(JSON.stringify(obj.oo)),
  };
}

module.exports = { deepCopy };
