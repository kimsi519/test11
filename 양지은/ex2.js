// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
	// end가 없는 경우
	if (end === undefined) {
		if (start > 0) {
			end = start;
			start = 1;
		} else if (start < 0) {
			end = -1;
		} else if (start === 0) {
			return [0];
		}
	}

	// 비정상 (예외)
	if ((start - end) * step > 0) {
		return [];
	}

	if (step === 0 || start === end) {
		return [start];
	}

	let result = new Array(); // 결과 배열

	if (Number.isInteger(step)) {
		if (step > 0) {
			for (let i = start; i <= end; i += step) {
				result.push(i);
			}
		} else {
			for (let i = start; i >= end; i += step) {
				result.push(i);
			}
		}
	} else {
		// step이 정수가 아닌 경우

		result.push(start);
		if (step > 0) {
			for (let i = start + step; i < end; i += step) {
				result.push(+i.toFixed(1));
			}
		} else {
			for (let i = start + step; i > end; i += step) {
				result.push(+i.toFixed(1));
			}
		}
		result.push(end);
	}

	return result;
};

module.exports = { range };
