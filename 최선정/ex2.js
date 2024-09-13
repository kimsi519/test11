const range = (start, end, step = start > end ? -1 : 1) => {
  if (end === undefined) {
    if (start === 0) return [0];
    if (start > 0) return Array.from({ length: start }, (_, i) => i + 1);
    if (start < 0) return Array.from({ length: -start }, (_, i) => start + i);
  }

  if (start === end) {
    return [start];
  }

  if (step === 0) {
    return [start];
  }

  if ((start < end && step < 0) || (start > end && step > 0)) {
    return [];
  }

  const result = [];

  if (step > 0) {
    for (let i = start; i <= end; i = parseFloat((i + step).toFixed(10))) {
      result.push(i);
    }
  } else {
    for (let i = start; i >= end; i = parseFloat((i + step).toFixed(10))) {
      result.push(i);
    }
  }

  return result;
};

module.exports = { range };
