const INITIALS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
const INITIALS_PERIOD = "까".charCodeAt(0) - "가".charCodeAt(0);
const START_CHARCODE = "가".charCodeAt(0);
const END_CHARCODE = "힣".charCodeAt(0);

function extractInitial(letter) {
  const letterCode = letter.charCodeAt(0);
  if (!isKorean(letterCode)) {
    return letter;
  }
  const charCode = letterCode - START_CHARCODE;
  const charIdx = Math.floor(charCode / INITIALS_PERIOD);
  return INITIALS[charIdx];
}

function isKorean(charCode) {
  return START_CHARCODE <= charCode && charCode <= END_CHARCODE;
}

function getInitialWords(data) {
  return data.map((word) => word.split("").map(extractInitial).join(""));
}

function searchByKoreanInitialSound(data, firstSounds) {
  const initialWords = getInitialWords(data);
  const firstSoundsRegex = new RegExp(firstSounds);

  return data.filter((_, index) => firstSoundsRegex.test(initialWords[index]));
}

module.exports = { searchByKoreanInitialSound };
