function deepCopy(obj) {
  let wm = new WeakMap(); //recursiob 방지
  let copy;
  // 순환참조 방지 -> .has사용
  if(wm.has(obj)){  
    return wm.get(obj)  
  }

  // 객체, null 값 경우 그대로 반환
  if(typeof obj !== "object" || obj === null){
    return obj; //primitve타입 처리방법
  }

  // 배열일 경우
  if(Array.isArray(obj)){
    copy = [];
    wm.set(obj, copy);
    for(let i = 0; i < obj.length; i++){
      copy[i] = deepCopy(obj[i], wm);
    }
    return copy;
  }

  // Set
  else if(obj instanceof Set){
    copy = new Set();
    wm.set(obj, copy);
    obj.forEach((value =>{
      copy.add(deepCopy(value, wm));
    }));
    return copy;
  }

  // WeakSet, WeakMap 처리 (복사 불가)
  if (obj instanceof WeakSet || obj instanceof WeakMap) {
    return obj; // 복사 불가하므로 원본 반환
  }

  
  // // WeakSet
  // else if(obj instanceof Set){
  //   copy = new WeakSet();
  //   wm.set(obj, copy);
  //   obj.forEach((value =>{
  //     copy.add(deepCopy(value, wm));
  //   }));
  //   return copy;
  // }

  // Map
  else if(obj instanceof Map){
    copy = new Map();
    wm.set(obj, copy);
    obj.forEach((key, value) =>{
      copy.set(deepCopy(key, wm), deepCopy(value, wm));
    });
    return copy;
  }

  // // WeakMap
  // else if(obj instanceof Map){
  //   copy = new WeakMap();
  //   wm.set(obj, copy);
  //   obj.forEach((key,value) =>{
  //     copy.set(deepCopy(key, wm), deepCopy(value, wm));
  //   });
  //   return copy;
  // }

  // Date 객체 복사
  if (obj instanceof Date) 
    return new Date(obj);

  // RegExp 객체 복사
  if (obj instanceof RegExp) 
    return new RegExp(obj);


  // 객체의 복사
  const result = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  wm.set(obj, result);  // 순환 참조 방지에 기록

  // Symbol을 포함한 모든 속성 복사
  Reflect.ownKeys(obj).forEach(key => {
    result[key] = deepCopy(obj[key], wm);
  });
  return result;



  // 객체
  // else {
  //   copy = {};
  //   wm.set(obj,copy);
  //   for (let key in obj) {
  //     if (obj.hasOwnProperty(key)) {
  //       copy[key] = deepCopy(obj[key]); // 객체의 깊이만큼 복사 (재귀)
  //     }
  //   }
  //   return copy;
  // }

}

module.exports = { deepCopy };



