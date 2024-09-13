Array.prototype.sortBy = function (sortProp = '') {
  // 정렬 기준
  function parseSort(psort) {
    return psort.split(',').map(part => {
      const [key, order = 'asc'] = part.split(':');
      return { key, order };
    });
  }

  function createCompare(key, order) {
    return (a, b) => {
      if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
      return 0;
    };
  }

  // 정렬 기준 파싱
  const sortParams = parseSort(sortProp);

  // 비교 함수 생성
  const compareFunctions = sortParams.map(({ key, order }) => createCompare(key, order));

  // 배열 정렬
  return this.sort((a, b) => {
    for (const compare of compareFunctions) {
      const result = compare(a, b);
      if (result !== 0) return result;
    }
    return 0;
  });
  
};