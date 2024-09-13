const INITIAL_SOUNDS = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

// 문자열에서 초성을 추출
function getInitialSound(str) {
  return str.split('').map(char => {
    const code = char.charCodeAt(0);

    // 한글인지 확인
    if (code >= 0xAC00 && code <= 0xD7A3) {
      const initialIndex = Math.floor((code - 0xAC00) / (21 * 28));
      return INITIAL_SOUNDS[initialIndex];
    }
    return char; // 한글이 아닐 때 문자를 그대로 반환
  }).join('');
}

// 초성 검색 함수
const searchByKoreanInitialSound = (data, searchPattern) => {
  const normalizedPattern = searchPattern.split('').map(char => {
    return char;
  }).join('');

  // 추출한 초성 패턴과 비교
  return data.filter(item => {
    const initialSound = getInitialSound(item);
    return initialSound.includes(normalizedPattern);
  });
};

module.exports = { searchByKoreanInitialSound };