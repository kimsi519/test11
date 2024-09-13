const range = (start, end, step = start > end ? -1 : 1) => {
  let resultArry = []; // 결과

  // end가 정의되지 않은 경우, start만 사용한 경우
  if (end === undefined) {
    if (start === 0) return [0]; // start가 0일 경우 [0] 반환

    const uniqueNum = start;
    start = uniqueNum > 0 ? 1 : uniqueNum; // start가 양수면 1로, 음수면 그대로 사용
    end = uniqueNum > 0 ? uniqueNum : -1; // 양수면 uniqueNum, 음수면 -1로 설정
  }

  // step이 0이거나 start와 end가 같은 경우, 단일 값 배열 반환
  if (step === 0 || start === end) {
    return [start];
  }

  // start와 end의 차이가 step과 방향이 맞지 않으면 빈 배열 반환
  if ((start - end) * step > 0) {
    return [];
  }

  // 조건 함수 정의
  const condition = step < 0 ? (i) => i >= end : (i) => i <= end;
  // 현재 위치에 step을 더한 후 반올림하여 새로운 위치 계산
  const operation = (i) => Math.round((i + step) * 10) / 10;

  // 결과 배열에 값 추가
  for (let i = start; condition(i); i = operation(i)) {
    resultArry.push(i);
  }

  return resultArry;
};

module.exports = { range };
