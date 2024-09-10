module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const dict = {
      ㄱ: "[가-깋]",
      ㄲ: "[까-낗]",
      ㄴ: "[나-닣]",
      ㄷ: "[다-딯]",
      ㄸ: "[따-띻]",
      ㄹ: "[라-맇]",
      ㅁ: "[마-밓]",
      ㅂ: "[바-빟]",
      ㅃ: "[빠-삫]",
      ㅅ: "[사-싷]",
      ㅆ: "[싸-앃]",
      ㅇ: "[아-잏]",
      ㅈ: "[자-짛]",
      ㅉ: "[짜-찧]",
      ㅊ: "[차-칳]",
      ㅋ: "[카-킿]",
      ㅌ: "[타-팋]",
      ㅍ: "[파-핗]",
      ㅎ: "[하-힣]",
    };
    const result = [];
    const regex = new RegExp(
      firstSounds
        .split("")
        .map((i) => {
          if (typeof dict[i] === "undefined") {
            return i;
          }
          return dict[i];
        })
        .join(""),
      "g"
    );

    for (const d of data) {
      if (d.match(regex)) {
        result.push(d);
      }
    }
    return result;
  },
};
