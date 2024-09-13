const range = (s, e, step = s > e ? -1 : 1) => {
    // step이 0일 때, 예외 처리
    if (step === 0) {
        return [s];
    }

    // e가 null일 경우
    if (e === undefined) {
        if (s > 0) {
            e = s;
            s = 1;
        } else if (s < 0) {
            e = -1;
        } else {
            return [0]; // s가 0인 경우
        }
    }

    // 범위가 반대 방향으로 설정된 경우
    if ((s - e) * step > 0) {
        return [];
    }

    const result = [];
    let current = s;

    while ((step > 0 && current <= e) || (step < 0 && current >= e)) {
        result.push(Number(current.toFixed(10))); // 소수점 오차 처리
        current = parseFloat((current + step).toFixed(10)); // 소수점 오차 방지
    }

    // step이 0일 때 s와 e가 같은 경우도 포함
    if (step === 0 && s === e) {
        result.push(s);
    }

    return result;
};
module.exports = { range };


