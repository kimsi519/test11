module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    return data.filter((str) => str.match(getRegExp(firstSounds)));
  },
};
const INITIAL = [
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
const INITIAL_RANGE = [
  "가-깋",
  "까-낗",
  "나-닣",
  "다-딯",
  "따-띻",
  "라-맇",
  "마-밓",
  "바-빟",
  "빠-삫",
  "사-싷",
  "싸-앃",
  "아-잏",
  "자-짛",
  "짜-찧",
  "차-칳",
  "카-킿",
  "타-팋",
  "파-핗",
  "하-힣",
];

const initialMap = new Map();
INITIAL.forEach((initial, index) => {
  initialMap.set(initial, INITIAL_RANGE[index]);
});

function getRegExp(initials) {
  return new RegExp(
      initials
          .split("")
          .map((initial) => `[${initialMap.get(initial) || initial}]`) // 초성이 있으면 매핑된 범위를 사용, 없으면 그대로 사용
          .join("")  // 각각의 범위를 이어붙임
  );
}