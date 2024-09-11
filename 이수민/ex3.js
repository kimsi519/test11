Array.prototype.sortBy = function (sortProp = "") {
  const sorter = sortProp.split(",").map((query) => {
    const [key, orderBy = "asc"] = query.split(":");
    return { key, orderBy: orderBy.toLowerCase() };
  });
  // sort의 compare function: 기준 key에 따라 orderBy대로 a의 값이 b의 값보다 더 크면 1, 작으면 -1, b와 같으면 0 반환
  return this.slice().sort((a, b) => {
    for (const { key, orderBy } of sorter) {
      const value1 = a[key];
      const value2 = b[key];

      if (value1 < value2) {
        return orderBy === "asc" ? -1 : 1;
      }
      if (value1 > value2) {
        return orderBy === "asc" ? 1 : -1;
      }
    }
    return 0;
  });
};
