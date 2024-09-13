module.exports = {
	searchByKoreanInitialSound: (data, firstSounds) => {
		// 초성 정규식 패턴
		const initialSoundPattern = {
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

		// 초성을 정규식 패턴으로 변환
		const regexPattern = firstSounds
			.split("")
			.map((char) => initialSoundPattern[char] || char)
			.join(".*?");

		// 정규식 생성
		const regex = new RegExp(regexPattern);

		// 데이터 필터링
		return data.filter((item) => regex.test(item));
	},
};
