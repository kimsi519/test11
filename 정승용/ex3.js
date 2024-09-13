Array.prototype.sortBy = function (sortProp = "") {
  if (!sortProp) return this;

  const props = sortProp.split(",").map((prop) => {
    const [key, order] = prop.split(":");
    return { key, order: order === "desc" ? -1 : 1 };
  });

  return this.slice().sort((a, b) => {
    for (const { key, order } of props) {
      if (a[key] > b[key]) return order;
      if (a[key] < b[key]) return -order;
    }
    return 0;
  });
};

module.exports = {};
