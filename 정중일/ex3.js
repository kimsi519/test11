Array.prototype.sortBy = function (sortProp = "") {
  const sortTypes = sortProp.split(",").map((s) => {
    const [key, order = "asc"] = s.split(":");
    return [key, order];
  });

  return this.sort((a, b) => {
    for (const [key, order] of sortTypes) {
      var compared;
      if (typeof a[key] === "string") {
        compared = a[key].localeCompare(b[key]);
      } else {
        compared = a[key] - b[key];
      }
      if (compared === 0) continue;
      return order === "asc" ? compared : -compared;
    }
  });
};
