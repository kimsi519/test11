// module.exports = {
//   searchByKoreanInitialSound: (data, firstSounds) => {},
// };

// 한글 초성, 중성, 종성 관련 유니코드 범위
const CHO_SUNG_START = 0x1100;
const CHO_SUNG_END = 0x1112;
const HANGUL_START = 0xac00; // 가
const HANGUL_END = 0xd7a3; // 힣
const INITIAL_SOUND = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ',
  'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// 초성 추출 함수
function getInitialSound(char) {
  const code = char.charCodeAt(0);
  if (code < HANGUL_START || code > HANGUL_END) return char; // 한글이 아닌 경우 그대로 반환
  const choIndex = Math.floor((code - HANGUL_START) / (21 * 28)); // 초성 인덱스 추출
  return INITIAL_SOUND[choIndex];
}

// 초성 검색 함수
function searchByKoreanInitialSound(data, firstSounds) {
  const regexPattern = firstSounds.split('').map((sound) => {
    return sound === '.' ? '.' : getInitialSound(sound); // 정규식으로 초성 패턴을 생성
  }).join('.*'); // 중간에 임의의 문자가 들어올 수 있도록 처리

  const regex = new RegExp(regexPattern);

  return data.filter(item => {
    const itemInitials = item.split('').map(getInitialSound).join('');
    return regex.test(itemInitials); // 초성 패턴이 일치하는 항목 필터링
  });
}

module.exports = {
  searchByKoreanInitialSound
};
