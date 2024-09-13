Array.prototype.sortBy = function (sortProp = '') {
  if (!sortProp) return this.slice(); // sortProp이 비어있으면 배열 복사 반환

  const props = sortProp.split(',').map(prop => {
    const [key, order = 'asc'] = prop.split(':');
    return { key, order: order === 'desc' ? -1 : 1 };
  });

  return this.slice().sort((a, b) => {
    for (const { key, order } of props) {
      const valueA = a[key];
      const valueB = b[key];

      if (valueA < valueB) return -1 * order;
      if (valueA > valueB) return 1 * order;
    }
    return 0;
  });
};
