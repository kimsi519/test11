Array.prototype.sortBy = function (sortProp = '') {
  // 정렬 기준을 파싱
  const prop = sortProp.split(',').map(part => {
    const [key, order = 'asc'] = part.split(':');
    return { key, order: order === 'desc' ? -1 : 1 };
  });

  // 정렬 함수
  this.sort((a, b) => {
    for (const { key, order } of prop) {
      const aValue = a[key] != null ? a[key] : '';
      const bValue = b[key] != null ? b[key] : '';

      if (aValue < bValue) return -1 * order;
      if (aValue > bValue) return 1 * order;
    }
    return 0;
  });

  // 정렬된 배열 반환
  return this;
};
