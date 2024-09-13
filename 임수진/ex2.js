const range = (start, end, step = start > end ? -1 : 1) => {

    const result = [];
    const EPSILON = 1e-10; // 부동 소수점 오차를 보정하기 위한 아주 작은 값
    const DECIMALS = 10; // 소수점 자리수

    if (step === 0 || start === end) return [start];

    // end가 없을 경우
    if (end === undefined) {
        if (start > 0) {
            end = start;
            start = 1;
        } else if (start < 0) {
            end = -1;
        } else {
            // start가 0일 경우 
            result.push(start);
        }
    }

    // 예외
    if ((start - end) * step > 0) return [];

    if (step > 0) {
        for (let i = start; i <= end + EPSILON; i += step) {
            if (i > end + EPSILON) break; // 범위를 초과할 경우 종료
            result.push(parseFloat(i.toFixed(DECIMALS)));
        }
    } else {
        for (let i = start; i >= end - EPSILON; i += step) {
            if (i < end - EPSILON) break; // 범위를 초과할 경우 종료
            result.push(parseFloat(i.toFixed(DECIMALS)));
        }
    }
    return result;
};

module.exports = { range };