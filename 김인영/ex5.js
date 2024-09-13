module.exports = {
  getConsonant: (char) => {
    const initialConsonants = 'ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ';
    const unicodeOffset = char.charCodeAt(0) - 0xAC00;

    // 한글이 아니면 그대로 반환 (숫자, 특수문자 처리)
    if (unicodeOffset < 0 || unicodeOffset > 11171) {
      return char;
    }

    const initialIndex = Math.floor(unicodeOffset / 588);
    return initialConsonants[initialIndex];
  },
  searchByKoreanInitialSound: (data, firstSounds) => {
    // 초성 입력을 배열로 변환
    const firstConsonants = [...firstSounds];

    return data.filter(item => {
      // 각 문자의 초성을 추출
      const consonants = [...item].map(module.exports.getConsonant);

      // 순차적으로 초성 패턴이 일치하는지 확인
      let pos = 0;
      for (const consonant of consonants) {
        if (consonant === firstConsonants[pos]) {
          pos++;
        }
        if (pos === firstConsonants.length) {
          return true; // 모든 초성이 순서대로 매칭되면 true 반환
        }
      }

      return false; // 매칭되지 않으면 false 반환
    });
  },
};