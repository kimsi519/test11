const range = (start, end, step) => {
    if (step === undefined) {
        step = start > end ? -1 : 1;
    }
    
    if (step === 0 || start === end) {
        return [start];
    }

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

    if ((start > end && step > 0) || (start < end && step < 0)) {
        return [];
    }

    const result = [];
    let current = start;
    const epsilon = Number.EPSILON * 100;

    while ((step > 0 && current <= end + epsilon) || (step < 0 && current >= end - epsilon)) {
        result.push(Number(current.toFixed(10))); 
        current += step;
    }

    return result;
};

module.exports = { range };