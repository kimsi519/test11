module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const CHO = [
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

    // 초성(자음) 문자열을 정규식으로 변환
    let pattern = "";
    for (let initial of firstSounds) {
      if (CHO.includes(initial)) {
        const idx = CHO.indexOf(initial);
        const start = 0xac00 + idx * 21 * 28; // 초성 시작 유니코드
        const end = start + 21 * 28 - 1; // 초성 끝 유니코드
        pattern += `[\\u${start.toString(16).padStart(4, "0")}-\\u${end.toString(16).padStart(4, "0")}]`;
      } else {
        pattern += initial; // 숫자나 다른 문자는 그대로 패턴에 포함
      }
    }

    const regex = new RegExp(pattern);

    // 리스트에서 초성 패턴과 일치하는 항목 필터링
    return data.filter((item) => regex.test(item));
  },
};
