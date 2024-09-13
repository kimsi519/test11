const range = (start, end, step) => {
	if (end === undefined) {
		if (start > 0) {
			end = start;
			start = 1;
		} else if (start < 0) {
			end = -1;
		} else {
			return [0];
		}
	}

	// step이 정의되지 않은 경우 기본값 설정
	if (step === undefined) {
		step = start <= end ? 1 : -1;
	}

	// step이 0이거나 start와 end가 같은 경우
	if (step === 0 || start === end) {
		return [start];
	}

	// 예외 케이스 처리
	if ((start < end && step < 0) || (start > end && step > 0)) {
		return [];
	}

	const result = [];
	const epsilon = Number.EPSILON * 100; // 부동 소수점 비교를 위한 작은 값

	if (step > 0) {
		for (let i = start; i <= end + epsilon; i += step) {
			result.push(Number(i.toFixed(10)));
		}
	} else {
		for (let i = start; i >= end - epsilon; i += step) {
			result.push(Number(i.toFixed(10)));
		}
	}

	// 중복 제거 및 정렬
	return [...new Set(result)].sort((a, b) => (step > 0 ? a - b : b - a));
};

module.exports = { range };
