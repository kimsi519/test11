const initialSoundMap = {
  'ㄱ': '[ㄱㄲ]',
  'ㄲ': '[ㄲ]',
  'ㄴ': '[ㄴ]',
  'ㄷ': '[ㄷ]',
  'ㄸ': '[ㄸ]',
  'ㄹ': '[ㄹ]',
  'ㅁ': '[ㅁ]',
  'ㅂ': '[ㅂ]',
  'ㅃ': '[ㅃ]',
  'ㅅ': '[ㅅ]',
  'ㅆ': '[ㅆ]',
  'ㅇ': '[ㅇ]',
  'ㅈ': '[ㅈ]',
  'ㅉ': '[ㅉ]',
  'ㅊ': '[ㅊ]',
  'ㅋ': '[ㅋ]',
  'ㅌ': '[ㅌ]',
  'ㅍ': '[ㅍ]',
  'ㅎ': '[ㅎ]',
};

const searchByKoreanInitialSound = (data, initSound) => {
  //정규식패턴
  const pattern = initSound.split('').map(char => 
    initialSoundMap[char] !== undefined ? initialSoundMap[char] : char).join('.*?');
  const regExp = new RegExp(pattern);

  return data.filter(item => regExp.test(item));
};

module.exports = {searchByKoreanInitialSound};
