const range = (start, end, step = start > end ? -1 : 1) => {
  let result = [];

  // 소수 처리용 함수
  const addWithPrecision = (a, b) => {
    return parseFloat((a + b).toFixed(10)); // 소수점 10자리까지 처리
  };

  // end가 정의되지 않은 경우 처리
  if (end === undefined) {
    if (start === 0) return [0];
    if (start > 0) {
      end = start;
      start = 1;
    } else {
      end = -1;
    }
  }

  // step이 0일 경우 단일 요소 배열 반환
  if (step === 0) return [start];

  // 범위와 step 방향이 일치하지 않을 때 빈 배열 반환
  if ((start > end && step > 0) || (start < end && step < 0)) {
    return result;
  }

  // 일반적인 경우에 대한 루프 (소수 포함)
  for (
    let i = start;
    step > 0 ? i <= end : i >= end;
    i = addWithPrecision(i, step)
  ) {
    result.push(i);
  }

  return result;
};

module.exports = { range };
