Array.prototype.sortBy = function (sortProp = "") {
  const statements = sortProp.split(",").map((statement) => {
    const [key, order] = statement.split(":");
    return { key, order: order === "desc" ? -1 : 1 };
  });

  const compare = (a, b) => {
    for (const { key, order } of statements) {
      if (a[key] > b[key]) return order;
      if (a[key] < b[key]) return -order;
    }
    return 0;
  };

  return this.sort(compare);
};
