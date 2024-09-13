module.exports = {
    searchByKoreanInitialSound(data, firstSounds) {
        // 한글 유니코드 시작값과 끝값
        const HANGUL_START_CHARCODE = '가'.charCodeAt(0);
        const HANGUL_END_CHARCODE = '힣'.charCodeAt(0);

        // 초성 + 중성 + 종성 조합의 합
        const TOTAL_SYLLABLE_COMBINATIONS = 588;

        const initialConsonants = [
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ',
            'ㄹ', 'ㅁ', 'ㅂ','ㅃ', 'ㅅ',
            'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ',
            'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
        ]

        // 초성 가져오기
        const getInitialSound = (char) => {
            const code = char.charCodeAt(0);
            if (code >= HANGUL_START_CHARCODE && code <= HANGUL_END_CHARCODE) {
                // 한글 음절의 초성 반환
                const index = Math.floor((code - HANGUL_START_CHARCODE) / TOTAL_SYLLABLE_COMBINATIONS);
                return initialConsonants[index] || '';
            } else {
                // 한글이 아닐 경우, 그대로 반환
                return char;
            }
        };

        // 초성 정규식 패턴 생성 함수
        const getInitialSoundRegex = (firstSounds) => {
            const pattern = firstSounds.split('').map(char => {
                if (initialConsonants.includes(char)) {
                    // 초성 문자는 [char]로 패턴 생성
                    return `[${char}]`;
                } else {
                    // 숫자나 기타 문자는 그대로 사용
                    return char;
                }
            }).join('');
            return new RegExp(pattern, 'u'); // 'u' 플래그를 사용하여 유니코드 문자 인식
        };

        // 초성 정규식 패턴을 생성
        const regex = getInitialSoundRegex(firstSounds);

        // 데이터 필터링
        return data.filter(element => {
            // 문자열에서 초성 추출
            const extractedInitialSounds = Array.from(element).map(getInitialSound).join('');
            return regex.test(extractedInitialSounds);
        });
    }
};