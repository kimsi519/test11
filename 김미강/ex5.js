module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const CHOSUNG_LIST = [
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

    // 초성 가져오기
    const getChosung = (char) => {
      const code = char.charCodeAt(0) - 0xac00;
      return code >= 0 && code < 11172
        ? CHOSUNG_LIST[Math.floor(code / 588)]
        : char; // 한글이 아니면 그대로 반환
    };

    // 정규식 패턴 생성
    const regex = new RegExp(
      firstSounds
        .split("")
        .map((char) => (/[ㄱ-ㅎ]/.test(char) ? char : `(${char})`)) // 초성은 그대로, 비초성은 괄호
        .join(".*?")
    );

    return data.filter((item) => {
      const strChosung = item.split("").map(getChosung).join("");
      return regex.test(strChosung);
    });
  },
};
