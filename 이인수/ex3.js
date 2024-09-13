Array.prototype.sortBy = function (sortProp = '') {
  // 원본 변경 하지 않기
  let copyThis = this.slice();

  // 정렬 기준이 여러 개인 경우: ,를 기준으로 순차적으로 정렬
  const sortProps = sortProp.split(',').map((prop) => {
    let [key, sort = 'asc'] = prop.split(':');
    // 각 정렬에서 오름차순, 내림차순 여부 확인
    sort = sort === 'desc' ? -1 : 1;
    return { key, sort };
  });

  // 정렬 수행
  copyThis.sort((a, b) => {
    for (const { key, sort } of sortProps) {
      if (a[key] > b[key]) return sort;
      if (a[key] < b[key]) return -sort;
    }
    return 0;
  });

  return copyThis;
};
