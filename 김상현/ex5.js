const base = 44032; // 한글이 시작되는 유니코드 번호
const chocount = 19; // 초성 수
const jungcount = 21; // 중성 수
const jongcount = 28; // 종성 수

module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    let newdata = [];
    for(let s of data) {
      let newstr = ''; // 초성만 뽑아낸 결과를 축적할 문자열
      for(let l of s) {
        let code = l.charCodeAt(0);
        if(code < 44032 || code > 55203) { // 한글의 영역을 넘어설 때는
          newstr += String.fromCharCode(code); // 그냥 그 문자 그대로 append
          continue;
        }      
        // 초성 인덱스를 계산
        const offset = code - base;
        const cho = Math.floor(offset / (jungcount * jongcount));
      
        // 초성 배열
        const CHOSUNG = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split('');
        newstr += CHOSUNG[cho]; // 초성만 따서 축적시키기
      }
      newdata.push(newstr); // 초성만 딴 결과를 새로운 데이터 배열에 push
    }
    let rx = new RegExp(firstSounds, 'g'); // 찾는 초성에 대한 정규식 만들기
    let result = []; // 찾은 결과 저장
    for(let i = 0; i<data.length; i++) {
      if(newdata[i].match(rx)){ // 찾았으면
        result.push(data[i]); // 결과에 push
      }
    }
    return result; // 찾은 결과 반환
  },
};
