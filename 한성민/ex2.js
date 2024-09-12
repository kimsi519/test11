// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
    const result = [];
    if (start === end) return [start];
    if (end === undefined) {
        step = 1;
        if (start > 0) {
            end = start;
            start = 1;
        } else if (start === 0) return [start];
        else {
            end = -1;
        }
    }

    if ((start < end && step === 0) || (start > end && step === 0)) return [start];
    if ((start < end && step < 0) || (start > end && step > 0)) return [];

    for (let i = start; (step > 0) ? i <= end : i >= end; i += step) {
        i = Math.round(i * 10) / 10
        result.push(i);
    }

    return result;
};

module.exports = {range};
