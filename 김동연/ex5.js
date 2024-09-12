function convertInitialsToHangul(initials) {
  // 초성 유니코드 문자와 초성 유니코드의 매핑
  const initialMap = {
    'ᄀ': 'ㄱ', 'ᄁ': 'ㄲ', 'ᄂ': 'ㄴ', 'ᄃ': 'ㄷ', 'ᄄ': 'ㄸ',
    'ᄅ': 'ㄹ', 'ᄆ': 'ㅁ', 'ᄇ': 'ㅂ', 'ᄈ': 'ㅃ', 'ᄉ': 'ㅅ',
    'ᄊ': 'ㅆ', 'ᄋ': 'ㅇ', 'ᄌ': 'ㅈ', 'ᄍ': 'ㅉ', 'ᄎ': 'ㅊ',
    'ᄏ': 'ㅋ', 'ᄐ': 'ㅌ', 'ᄑ': 'ㅍ', 'ᄒ': 'ㅎ'
  };

  return initials.split('').map(char => initialMap[char] || char).join('');
}

function getInitials(arr) { // 초성만 파싱
  let initials = '';
  for (let i = 0; i < arr.length; i++) {
    let charCode = arr.charCodeAt(i);

    if (charCode >= 44032 && charCode <= 55203) {
      let idx = Math.floor((charCode - 44032) / (21 * 28)); // 초성 추출
      initials += String.fromCharCode(idx + 4352); // 초성 유니코드 변환
    } else {
      initials += arr[i]; // 숫자나 문자는 그대로 추가
    }
  }
  return convertInitialsToHangul(initials); // 변환된 초성 문자를 한글 초성 문자로 반환
}

// 여러 문자열에서 초성 추출하는 함수
function extractInitials(data) {
  return data.map(getInitials); // 각 문자열의 초성을 배열로 반환
}

module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    let result = []; // 결과값 저장소

    // 각 데이터의 초성을 추출하여 비교
    const initialsData = extractInitials(data); // 데이터를 초성으로 변환한 배열

    // 입력받은 firstSounds로부터 정규표현식 생성
    const pattern = firstSounds.split('').map(c => {
      if (/[ㄱ-ㅎ]/.test(c)) {
        return c; // 한글 초성일 경우 그대로 사용
      }
      else if (/\d/.test(c)) {
        return `${c}`; // 숫자일 경우 이스케이프 처리
      }
      else {
        return `\\${c}`; // 숫자나 다른 문자는 이스케이프 처리
      }
    }).join(''); // 패턴 사이에 '.*' 추가하여 유연한 매칭

    // 초성이 문자열 내 어디에든 있을 수 있도록 정규표현식 생성
    const regex = new RegExp(pattern);

    // 데이터와 초성 데이터를 비교
    data.forEach((item, index) => {
      if (regex.test(initialsData[index])) {
        result.push(item); // 초성이 입력값으로 일치하면 결과에 추가
      }
    });

    return result; // 필터링된 결과 반환
  },
};
