Array.prototype.sortBy = function(sortProp = '') {
  
  // 정의된 sort 기준을 파악하기 위해 sortProperty들을 split
  const criteria = sortProp.split(',').map(prop => {
    
    const [key, order] = prop.split(':'); // key: 정렬 대상 order: 정렬 기준
    
    return { key: key.trim(), order: order === 'desc' ? -1 : 1 };
  
  });

  // 커스텀 비교함수 정의
  const compare = (a, b) => {
    for (let { key, order } of criteria) {
      
      const first = a[key]; // 첫번째 대상
      const second = b[key]; // 두번째 대상

      // 대상의 타입이 불명확하면 continue
      if (first === undefined || second === undefined) continue;

      // order가 asc인 경우 -> order: -1이 되어 first - second 순 정렬
      // order가 desc인 경우 -> order: 1이 되어 second - first 순 정렬
      if (first < second) return -order;

      // order가 asc인 경우 -> order: -1이 되어 second - first 순 정렬
      // order가 desc인 경우 -> order: 1이 되어 first - second 순 정렬
      if (first > second) return order;
    }
    return 0; // 모든 기준에서 값이 같으면 0이라고 명시적으로 선언 통해 동일하게 간주
  };

  return this.slice().sort(compare); // 원본 배열 변경 없이 정렬 수행
};
