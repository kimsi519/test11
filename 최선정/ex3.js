Array.prototype.sortBy = function (sortProps = "") {
  const properties = sortProps.split(",").map((prop) => {
    const [key, order = "asc"] = prop.split(":");
    return { key: key.trim(), order: order.trim() };
  });

  return this.slice().sort((a, b) => {
    for (const { key, order } of properties) {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    }
    return 0;
  });
};
