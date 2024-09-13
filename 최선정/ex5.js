module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    function extractInitialConsonants(str) {
      const cho = [
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
      let result = "";
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i) - 44032;
        if (code >= 0 && code <= 11171) {
          result += cho[Math.floor(code / 588)];
        } else {
          result += str[i];
        }
      }
      return result;
    }
    const result = [];
    const keywordCho = extractInitialConsonants(firstSounds);
    for (const item of data) {
      const itemCho = extractInitialConsonants(item);
      if (itemCho.includes(keywordCho)) {
        result.push(item);
      }
    }
    return result;
  },
};
