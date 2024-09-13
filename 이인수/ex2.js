// range 함수를 작성하세요.

// step 기본값
const range = (start, end, step = start > end ? -1 : 1) => {
  // 비정상 요청
  if ((start - end) * step > 0) return [];

  // 길이가 1인 배열
  if (step === 0 || start === end) return [start];

  // e가 없는 경우
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

  const results = [];

  // step에 소수점이 포함되어 있는지에 따른 분기
  if (Number.isInteger(step)) {
    for (let i = start; start > end ? i >= end : i <= end; i += step) {
      results.push(i);
    }
  } else {
    // 소수점 자리수
    const decimalInfo = step.toString().split('.')[1].length;

    for (let i = start; start > end ? i >= end : i <= end; i += step) {
      // 소수점 자릿수에 맞춰 i 변환
      i = parseFloat(i.toFixed(decimalInfo));
      results.push(i);
    }
  }

  return results;
};

module.exports = { range };
