const range = (start, end, step = start > end ? -1 : 1) => {
    let result = [];
  
    const add = (a, b) => {
      return parseFloat((a + b).toFixed(10));
    };

    if (end === undefined) {
      if (start === 0) 
        return [0];

      if (start > 0) {
        end = start;
        start = 1;
      } else {
        end = -1;
      }
    }
  
    if (step === 0) 
      return [start];
  
    if ((start > end && step > 0) || (start < end && step < 0)) {
      return result;
    }
  
    for (let i = start; step > 0 ? i <= end : i >= end; i = add(i, step)) {
      result.push(i);
    }
  
    return result;
  };
  
  module.exports = { range };