// 인덱스에 맞게 초성 문자를 배열에 정의
const initialSounds = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', '.', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 
  'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

// 초성 문자를 반환하는 함수
const getInitialSound = (char) => {
  if (char.charCodeAt(0) < 0xAC00 || char.charCodeAt(0) > 0xD7A3) {
    return char; // 한글이 아닌 문자 처리
  }

  const baseCode = char.charCodeAt(0) - 0xAC00;
  const initialIndex = Math.floor(baseCode / (21 * 28));

  return initialSounds[initialIndex] || ''; // 초성 문자 반환
};

const searchByKoreanInitialSound = (data, firstSounds) => {
  return data.filter(item => {
    // 각 데이터 항목에서 초성을 추출하여 정렬된 문자열로 변환
    const itemInitialSounds = Array.from(item)
      .map(char => getInitialSound(char))
      .join('');
    // 초성 문자열이 주어진 문자열을 포함하는지 확인
    return itemInitialSounds.includes(firstSounds);
  });
};

module.exports = {
  searchByKoreanInitialSound,
};

// // 테스트 예시
// const s = ['가나다라마바사아자차카타파하', '고성군 토성면', '토성면 북면', '북면', '김1수'];
// console.log(searchByKoreanInitialSound(s, 'ㄱㅅㄱ')); // '강원도 고성군', '고성군 토성면' 포