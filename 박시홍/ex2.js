// range 함수를 작성하세요.
// const range = (start, end, step = start > end ? -1 : 1) => { };

// module.exports = { range };


function range(s, e, step) {
    let result = [];
  
    // Step 기본값 설정
    if (step === undefined) {
      step = s > e ? -1 : 1;
    }
  
    // e가 없을 때 처리
    if (e === undefined) {
      if (s > 0) {
        e = s;
        s = 1;
      } else if (s < 0) {
        e = -1;
      } else {
        return [0];  // s === 0인 경우
      }
    }
  
    // step이 0이거나 시작과 끝이 같으면 [s] 반환
    if (step === 0 || s === e) {
      return [s];
    }
  
    // 비정상(예외) 처리: (s - e) * step > 0
    if ((s - e) * step > 0) {
      return [];
    }
  
    // 소수점을 다루기 위해 부동소수점 문제 방지
    const precision = 10; // 소수점 처리를 위한 자리수
  
    // 범위 생성
    if (step > 0) {
      for (let i = s; i <= e + 1e-9; i += step) {
        result.push(Number(i.toFixed(precision)));  // 부동소수점 문제 해결
      }
    } else {
      for (let i = s; i >= e - 1e-9; i += step) {
        result.push(Number(i.toFixed(precision)));
      }
    }
  
    return result;
  }
  
  module.exports = { range };
  