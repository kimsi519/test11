const CHO_SEONG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

function getInitialSound(char) {
  const code = char.charCodeAt(0) - 44032; // '가'의 유니코드 시작점
  if (code < 0 || code > 11171) return char; // 한글이 아닌 경우 그대로 반환
  const cho = Math.floor(code / 588); // 초성의 인덱스 계산
  return CHO_SEONG[cho];
}

function searchByKoreanInitialSound(data, firstSounds) {
  // 초성 정규식을 만들기 위해 패턴을 생성
  const regex = new RegExp(
    firstSounds
      .split("")
      .map((sound) => sound.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // 특수문자 이스케이프
      .join(".*") // 초성 사이의 패턴을 허용하기 위해 ".*" 추가
  );

  // 각 문자열의 초성 추출 후 정규식으로 검사
  return data.filter((word) => {
    const initialSound = [...word].map(getInitialSound).join("");
    return regex.test(initialSound); // 초성 문자열과 패턴 비교
  });
}

module.exports = { searchByKoreanInitialSound };
