const start = '가';
const end = '힣';
const first_character = start.charCodeAt(0); // 가 -> 만들 수 있는 첫번째 글자의 유니코드 get
const end_character = end.charCodeAt(0); // 힣 -> 만들 수 있는 마지막 글자d의 유니코드 get
const initial_chosung = [ // 초성 종류
  'ㄱ', 'ㄲ', 
  'ㄴ', 
  'ㄷ', 'ㄸ', 
  'ㄹ', 'ㅁ', 
  'ㅂ', 'ㅃ', 
  'ㅅ', 'ㅆ',
  'ㅇ', 
  'ㅈ', 'ㅉ', 'ㅊ', 
  'ㅋ', 
  'ㅌ', 
  'ㅍ', 
  'ㅎ'
];

// 초성 추출 함수
function getInitialSound(char) {
  const code = char.charCodeAt(0); // 해당 문자의 유니코드 값 획득

  if (code < first_character || code > end_character) return char; // 한글이 아닌 경우 그대로 반환
  
  const chosungIndex = Math.floor((code - first_character) / (21 * 28)); // 초성 인덱스 추출하는 공식 -> 블로그 참고
  
  return initial_chosung[chosungIndex];
}

// 초성 검색 함수
function searchByKoreanInitialSound(arr, chosung) {
  const regexPattern = chosung.split('').map((sound) => {
    return getInitialSound(sound); // 정규식으로 초성 패턴을 생성
  }).join('.*'); // 정규식 패턴으로 변환

  const regex = new RegExp(regexPattern);

  // 배열을 순회하며 정규표현식에 맞는 아이템만을 추출
  return arr.filter(item => {
    const itemInitials = item.split('').map(getInitialSound).join('');
    return regex.test(itemInitials); // 초성 패턴이 일치하는 항목 필터링
  });
}

module.exports = {
  searchByKoreanInitialSound
};
