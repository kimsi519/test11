const { Console } = require("console");

function getInitials(str) {
  const 초성 = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const 가 = '가'.charCodeAt(0); //가의 유니코드 == 한글 시작 
  const 힣 = '힣'.charCodeAt(0); //힣의 유니코드 == 한글 끝

  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      
      if (code >= 가 && code <= 힣) {
        // 음절의 인덱스
        const idx = parseInt((code - 가) / 588);
        return 초성[idx];
      }
      else //한글이 아닐 경우, 그냥 반환 
        return char;
    })
    .join('');
}






module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const firstSoundsArray = firstSounds.split('').filter(char => char.trim() !== '');
    const firstSoundsRegex = new RegExp(firstSounds); // 초성 정규 표현식 생성
    
    return data.filter(item => {
      const initialSounds = getInitials(item);

      return firstSoundsRegex.test(initialSounds); // 정규 표현식으로 초성 일치 확인
    });
  },
};