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

for (let i = 0; i < INITIAL.length; i++) {
  initialMap.set(INITIAL[i], INITIAL_RANGE[i]);
}

function getRegExp(initials) {
  return initials
      .split("")
      .map(
          (initial) =>
              "[" +
              (initialMap.has(initial) ? initialMap.get(initial) : initial) +
              "]"
      )
      .join("");
}
