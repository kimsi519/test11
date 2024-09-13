// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
  let resultArry = [];

  if (end === undefined) {
    if (start === 0) return [0];

    const uniqueNum = start;
    start = uniqueNum > 0 ? 1 : uniqueNum;
    end = uniqueNum > 0 ? uniqueNum : -1;
  }

  if (step === 0 || start === end) {
    return [start];
  }

  if ((start - end) * step > 0) {
    return [];
  }

  const condition = step < 0 ? (i) => i >= end : (i) => i <= end;
  const operation = (i) => Math.round((i + step) * 10) / 10;

  for (let i = start; condition(i); i = operation(i)) {
    resultArry.push(i);
  }

  return resultArry;
};

module.exports = { range };
