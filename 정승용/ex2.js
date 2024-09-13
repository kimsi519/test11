// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
  const result = [];

  if (step === 0) return [start]; // step이 0인 경우 예외 처리

  if (end === undefined) {
    end = start;
    start = 0;
  }

  const condition = step > 0 ? (a, b) => a < b : (a, b) => a > b;

  for (let i = start; condition(i, end); i += step) {
    result.push(i);
  }

  return result;
};

module.exports = { range };
