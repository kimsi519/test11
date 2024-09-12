module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    // 초성 유니코드 범위 설정
    const initialConsonants = [
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

    // 초성을 매핑하는 배열
    const INITIAL_SOUND = initialConsonants.reduce((acc, char, idx) => {
      acc[char] = String.fromCharCode(0x1100 + idx); // 한글 초성의 유니코드 값 계산
      return acc;
    }, {});

    // 초성 정규식 생성
    const createInitialRegex = (initials) =>
      new RegExp(
        initials
          .split("")
          .map((ch) => INITIAL_SOUND[ch] || ch) // 초성에 해당하는 유니코드를 변환하여 매칭
          .join(".*"), // 각 초성을 사이에 '.*'를 추가하여 부분 일치를 지원
        "i" // 대소문자 구분 없이
      );

    // 검색 수행
    return data.filter((item) =>
      createInitialRegex(firstSounds).test(
        item
          .normalize("NFD") // 유니코드 정규화를 통해 분리
          .replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣]/g, "") // 한글만 남기고, 특수문자 제거
      )
    );
  },
};
