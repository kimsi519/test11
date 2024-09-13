// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
  if (step === 0 || start === end) return [start];

  if (typeof end === "undefined") {
    if (start > 0) {
      end = start;
      start = 1;
    } else if (start < 0) {
      end = -1;
    } else {
      return [0];
    }
  }

  if ((start - end) * step > 0) return [];

  const result = [];
  for (let i = start; step > 0 ? i <= end : i >= end; ) {
    result.push(i);
    i += step;
    if (step > 0 && step < 1) {
      i = Math.floor(i * 10) / 10;
    }
  }
  return result;
};

module.exports = { range };
