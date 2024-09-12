Array.prototype.sortBy = function (sortProp = '') {

  //정렬 조건이 여러개인 경우 sortKey, order를 객체로 하는 sortKeys 배열 생성
  const sortKeys = sortProp.split(',').map(p => {
    const [sortKey, order] = p.split(':');
    return { sortKey, order: order === 'desc' ? -1 : 1 };
  });

  let result = this.slice().sort((a, b) => {
    for (const { sortKey, order } of sortKeys) {
      if (a[sortKey] > b[sortKey]) return order;
      if (a[sortKey] < b[sortKey]) return -order;
    }
    return 0; // 모든 기준이 같을 경우
  });
  return result;
};