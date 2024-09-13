module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const initialSoundRegexMap = {
      'ㄱ': '[가-깋]',
      'ㄲ': '[가-깋]',
      'ㄴ': '[나-닣]',
      'ㄷ': '[다-딯]',
      'ㄸ': '[다-딯]',
      'ㄹ': '[라-림]',
      'ㅁ': '[마-밋]',
      'ㅂ': '[바-빋]',
      'ㅃ': '[바-빋]',
      'ㅅ': '[사-싯]',
      'ㅆ': '[사-싯]',
      'ㅇ': '[아-잇]',
      'ㅈ': '[자-짖]',
      'ㅉ': '[자-짖]',
      'ㅊ': '[차-칫]',
      'ㅋ': '[카-킿]',
      'ㅌ': '[타-틧]',
      'ㅍ': '[파-핳]',
      'ㅎ': '[하-힣]',
    };

    const regexPattern = firstSounds.split('').map(sound => initialSoundRegexMap[sound] || '').join('');
    const regex = new RegExp(`^(${regexPattern})`, 'i');

    return data.filter(item => {
      return item.split(' ').some(word => regex.test(word));
    });
  },
};
