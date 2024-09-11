// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
  const ret = [];
  // 1번 케이스: start만 있는 경우 (test case에는 정수만 있음)
  if (end === undefined) {
    // 1-1번 케이스: range(정수)일 때
    // 1-1-1번 케이스: range(양의 정수)일 때
    if (start > 0) {
      for (i = 1; i <= start; i++) {
        ret.push(i);
      }
      // 1-1-2번 케이스: range(음의 정수 or 0)일 때
    } else if (start < 0) {
      for (i = start; i < 0; i++) {
        ret.push(i);
      }
      // 1-1-3번 케이스: range(0)인 경우
    } else {
      ret.push(0);
    }
    // 2번 케이스: start, end가 다 있는 경우
  } else {
    // 2-1번 케이스: step이 0이거나 실수 0인 경우
    if (step === 0 || step - 0 === 1e-10) {
      ret.push(start);
      // 2-2번 케이스: step이 0이 아닌 경우
    } else {
      // 2-2-1번 케이스: step의 값이 start -> end의 추세와 맞는 경우
      if (!((start < end && step < 0) || (start > end && step > 0))) {
        // 2-2-1-1번 케이스: start -> end가 증가하는 경우
        if (start < end) {
          if (Number.isInteger(step)) {
            for (i = start; i <= end; i = i + step) {
              ret.push(i);
            }
          } else {
            for (i = start; i.toFixed(1) <= end; i = i + step) {
              ret.push(parseFloat(i.toFixed(1)));
            }
          }
          // 2-2-1-2번 케이스: start -> end가 감소하는 경우
        } else if (start > end) {
          if (Number.isInteger(step)) {
            for (i = start; i >= end; i = i + step) {
              ret.push(i);
            }
          } else {
            for (i = start; i.toFixed(1) >= end; i = i + step) {
              ret.push(parseFloat(i.toFixed(1)));
            }
          }
          // 2-2-1-3번 케이스: start === end인 경우
        } else {
          ret.push(start);
        }
      }
    }
  }
  return ret;
};

module.exports = { range };
