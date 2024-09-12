const getInitialSound = (str) => {
  const initialSounds = [];
  for (let char of str) {
    const code = char.charCodeAt(0);
    if (code >= 0xAC00 && code <= 0xD7A3) { // 한글 음절 범위
      const initialIndex = Math.floor((code - 0xAC00) / 588);
      initialSounds.push(String.fromCharCode(0x1100 + initialIndex)); // 초성 문자
    } else {
      initialSounds.push(char); // 한글이 아닌 경우 그대로 추가
    }
  }
  return initialSounds.join('');
};

module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const firstSoundsArray = firstSounds.split('').filter(char => char.trim() !== '');
    const firstSoundsRegex = new RegExp('^' + firstSoundsArray.join(''), 'u'); // 초성 정규 표현식 생성

    return data.filter(item => {
      const initialSounds = getInitialSound(item);
      console.log(firstSoundsRegex);
      console.log(initialSounds)
      return firstSoundsRegex.test(initialSounds); // 정규 표현식으로 초성 일치 확인
    });
  },
};