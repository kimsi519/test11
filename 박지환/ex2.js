const range = (start, end, step) =>
{
  // start만 제공되었을 때
  if (end === undefined && step === undefined) 
  {
    if (start === 0)
      return [0];
    else if (start > 0)
    {
      end = start;
      start = 1;
    }
    else
      end = -1;
  }
  if (step === undefined)
    step = start > end ? -1 : 1;
  // step이 0일 때는 항상 start 값을 포함하는 단일 요소 배열을 반환
  if (step === 0 )
  {
    return [start];
  }

  const result = [];
  const epsilon = 1e-10;  // 부동소수점 오차를 보정할 작은 값

  if (step > 0)
  {
    for (let i = start; i <= end || Math.abs(i - end) < epsilon; i += step)
    {
      result.push(parseFloat(i.toFixed(10)));
    }
  }
  else
  {
    for (let i = start; i >= end || Math.abs(i - end) < epsilon; i += step)
    {
      result.push(parseFloat(i.toFixed(10)));
    }
  }
  return result;
};

module.exports = { range };