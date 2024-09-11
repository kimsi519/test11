// module.exports = {
//   searchByKoreanInitialSound: (data, firstSounds) => {},
// };


// 과제 중 일부인 연습문제
// 정규표현식

// 안타깝게도 정규표현식이 아님
// https://goni9071.tistory.com/164

let s = ['강원도 고성군', '고성군 토성면', '토성면 북면', '북면', '김1수'];

function getInital(arr){ // 초성만 파싱
  let inital = '';
  for(let i = 0; i < arr.length; i++){
    let idx = ((arr.charCodeAt(i) - 44032) /28) / 21;
    if(idx >= 0){
      inital += String.fromCharCode(idx + 4352);
    }
  }
  return inital;
}

console.log(getInital(s));
