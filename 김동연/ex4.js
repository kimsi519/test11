function deepCopy(obj) {
  let wm = new WeakMap(); //recursive 방지
  let copy;

  // 순환참조 방지 -> .has사용
  if(wm.has(obj)){  
    return wm.get(obj)  
  }

  // 객체, null 값 경우 그대로 반환
  if(typeof obj !== "object" || obj === null){
    return obj; //primitve타입 처리방법
  }

  // Array
  if(Array.isArray(obj)){
    copy = [];
    wm.set(obj, copy);
    for(let i = 0; i < obj.length; i++){
      copy[i] = deepCopy(obj[i], wm);
    }
    return copy;
  }

  // Set
  if(obj instanceof Set){
    copy = new Set();
    wm.set(obj, copy);
    obj.forEach((value =>{
      copy.add(deepCopy(value, wm));
    }));
    return copy;
  }

  // WeakSet (직접 접근)
  if (obj instanceof WeakSet) {
    copy = new WeakSet();
    wm.set(obj, copy);
    return copy;
  }

  // Map
  if(obj instanceof Map){
    copy = new Map();
    wm.set(obj, copy);
    obj.forEach((value, key) =>{
      copy.set(deepCopy(key, wm), deepCopy(value, wm));
    });
    return copy;
  }

  // WeakMap (직접 접근)
  if (obj instanceof WeakMap) {
    copy = new WeakMap();
    wm.set(obj, copy);
    return copy;
  }

  // 일반 객체
  copy = Object.create(Object.getPrototypeOf(obj));
  wm.set(obj, copy);

  // 모든 속성
  Reflect.ownKeys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], wm);
  });

  return copy;
}
module.exports = { deepCopy };