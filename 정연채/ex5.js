module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const HangulList = [
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

    const getHangul = (ch) => {
      const code = ch.charCodeAt(0) - 0xac00;
      return code >= 0 && code < 11172 ? HangulList[Math.floor(code / 588)] : ch;
    };

    const regex = new RegExp(
      firstSounds
        .split("")
        .map((char) => (/[ㄱ-ㅎ]/.test(char) ? char : `(${char})`)) 
        .join(".*?")
    );

    return data.filter((item) => {
      const hangulStr = item.split("").map(getHangul).join("");
      return regex.test(hangulStr);
    });
  },
};