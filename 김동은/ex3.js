Array.prototype.sortBy = function (sortProp = "") {
  // 여러 개 정렬 조건을 분석
  const parseSortProps = (sortProp) => {
    return sortProp.split(",").map((prop) => {
      const [key, order] = prop.split(":"); // key와 order 분리
      return { key, order: order === "desc" ? -1 : 1 }; // order가 'desc'이면 -1, 그렇지 않으면 1
    });
  };

  // 정렬 조건 파싱
  const sortProps = parseSortProps(sortProp);

  // 다중 조건을 처리하는 sort 함수
  return this.slice().sort((a, b) => {
    for (let { key, order } of sortProps) {
      // 각 조건 비교
      if (a[key] > b[key]) return order * 1; // a가 b보다 크면 order를 곱한 값 반환
      if (a[key] < b[key]) return order * -1; // a가 b보다 작으면 order의 반대 값 반환
    }
    return 0; // 모든 조건이 같으면 0 반환
  });
};
