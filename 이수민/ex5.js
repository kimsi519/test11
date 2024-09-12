module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const koreanInitials = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ".split("");
    const startCode = "가".charCodeAt();
    const endCode = "힣".charCodeAt();

    // 초성을 찾아주는 함수
    function getKoreanInitials(character) {
      const code = character.charCodeAt();
      // 44032: 가, 55203: 힣
      if (code >= startCode && code <= endCode) {
        const index = Math.floor((code - startCode) / (21 * 28));
        return koreanInitials[index];
      }
      return character;
    }

    // 정규식 생성
    const regex = new RegExp(
      firstSounds
        .split("")
        .map((e) => {
          if (koreanInitials.includes(e)) {
            return `[${e}]`;
          }
          return e;
        })
        .join(".*")
    );

    return data.filter((item) => {
      const initials = Array.from(item).map(getKoreanInitials).join("");
      return regex.test(initials);
    });
  },
};
