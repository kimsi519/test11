function getInitials(str) {
  const 초성 = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ];
  const 가 = '가'.charCodeAt(0);
  const 힣 = '힣'.charCodeAt(0);

  return str
    .split('')
    .map((char) => {
      const code = char.charCodeAt(0);
      // 한글 인지 확인
      if (code >= 가 && code <= 힣) {
        // 초성 19개, 중성 21개, 종성 28개로 구성 가능한 588가지 조합을 기반으로 초성 구하기
        const idx = parseInt((code - 가) / 588);
        return 초성[idx];
      }
      return char;
    })
    .join('');
}

module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    let result = [];
    // firstSounds를 정규표현식 패턴으로 변환
    const regex = new RegExp(firstSounds);

    for (let strData of data) {
      const initials = getInitials(strData);
      // 정규표현식과 일치하는지 확인
      console.log(initials, regex);
      if (regex.test(initials)) {
        result.push(strData);
      }
    }
    return result;
  },
};
