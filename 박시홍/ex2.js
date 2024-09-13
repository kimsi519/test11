function range(start, end, step) {
    let result = [];
  
    // Step 기본값 설정 
    if (step === undefined) {
      step = start > end ? -1 : 1;
    }
  
    // end가 없을 때 처리
    if (end === undefined) {
      if (start > 0) { 
        end = start; // 가상의 end를 만들어주고
        start = 1; // start를 1로 설정
        
      } else if (start < 0) { // start가 음수라면 비정상 예외처리 수행
        end = -1;
      } else { // start === 0인 경우, 0으로 된 배열 반환
        return [0];  
      }
    }
  
    // step이 0이거나 시작과 끝이 같으면 [start] 반환
    if (step === 0 || start === end) {
      return [start];
    }
  
    // 비정상 예외들 처리 ==> (start - end) * step > 0
    if ((start - end) * step > 0) {
      return [];
    }
  
    // js의 오차 문제를 해결하기 위한 부동소수점 문제 해결
    const precision = 10; // 소수점 처리를 위한 자리수
  
    // 범위 생성
    if (step > 0) {
      for (let i = start; i <= end + 1e-9; i += step) {
        result.push(Number(i.toFixed(precision)));  // 부동소수점 처리
      }
    } else {
      for (let i = start; i >= end - 1e-9; i += step) {
        result.push(Number(i.toFixed(precision))); // 부동소수점 처리
      }
    }
  
    return result;
  }
  
  module.exports = { range };
  