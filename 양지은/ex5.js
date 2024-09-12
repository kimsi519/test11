const consonants = new Map([
	["ㄱ", ["가", "까"]],
	["ㄲ", ["까", "나"]],
	["ㄴ", ["나", "다"]],
	["ㄷ", ["다", "따"]],
	["ㄸ", ["따", "라"]],
	["ㄹ", ["라", "마"]],
	["ㅁ", ["마", "바"]],
	["ㅂ", ["바", "빠"]],
	["ㅃ", ["빠", "사"]],
	["ㅅ", ["사", "싸"]],
	["ㅆ", ["싸", "아"]],
	["ㅇ", ["아", "자"]],
	["ㅈ", ["자", "짜"]],
	["ㅉ", ["짜", "차"]],
	["ㅊ", ["차", "카"]],
	["ㅋ", ["카", "타"]],
	["ㅌ", ["타", "파"]],
	["ㅍ", ["파", "하"]],
	["ㅎ", ["하", "힣"]],
]);

module.exports = {
	searchByKoreanInitialSound: (data, firstSounds) => {
		const patterns = new Array(); // 각 초성 별 정규표현식을 담기 위한 배열
		for (let s of firstSounds) {
			if (isNaN(s)) {
				const [start, end] = consonants.get(s);
				patterns.push(`[${start}-${end}]`);
			} else {
				// 해당 문자열이 숫자인 경우
				patterns.push(`[${Number(s)}]`);
			}
		}
		const regex = new RegExp(`${patterns.join("")}`, "u");

		const result = new Array();
		for (let word of data) {
			if (word.match(regex)) {
				result.push(word);
			}
		}
		return result;
	},
};

// const searchByKoreanInitialSound = (data, firstSounds) => {
// 	const patterns = new Array(); // 각 초성 별 정규표현식을 담기 위한 배열
// 	for (let s of firstSounds) {
// 		if (isNaN(s)) {
// 			const [start, end] = consonants.get(s);
// 			patterns.push(`[${start}-${end}]`);
// 		} else {
// 			// 해당 문자열이 숫자인 경우
// 			patterns.push(`[${Number(s)}]`);
// 		}
// 	}
// 	const regex = new RegExp(`${patterns.join("")}`, "u");

// 	const result = new Array();
// 	for (let word of data) {
// 		if (word.match(regex)) {
// 			result.push(word);
// 		}
// 	}
// 	return result;
// };

// const s = ["강원도 고성군", "고성군 토성면", "토성면 북면", "북면", "김1수"];
// console.log(searchByKoreanInitialSound(s, "ㄱㅇ")); // ["강원도 고성군"]
// console.log(searchByKoreanInitialSound(s, "ㄱㅅㄱ")); // ["강원도 고성군", "고성군 토성면"]
// console.log(searchByKoreanInitialSound(s, "ㄱ1ㅅ"));
