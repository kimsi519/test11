// range 함수를 작성하세요.
const range = (start, end, step = (start > end ? -1 : 1)) => {

    const result = [];
     // 소수 처리
    const fixedNum = (a, b) => {
        return parseFloat((a + b).toFixed(10));
    };

    // end가 주어지지 않은 경우
    if (end === undefined) {
        if (start === 0) return [0];
        else if (start > 0) {
            end = start;
            start = 1;
        } else {
            end = -1;
        }
    }

    if (step === 0) {
        return [start];   
    }

    // [] 예외 처리
    if ((start > end && step > 0) || (start < end && step < 0)) {
        return result;
    }

    for (let i = start; step > 0 ? i <= end : i >= end; i = fixedNum(i, step)) {
        result.push(i);
    }

    return result;
};

module.exports = { range };