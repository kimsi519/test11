Array.prototype.sortBy = function (obj = "") {
  const sortObj = obj.split(",").map((elem) => {
    const [key, order = "asc"] = elem.split(":");
    return { key, order };
  });

  return this.sort((a, b) => {
    for (const { key, order } of sortObj) {
      const comp = a[key] < b[key] ? -1 : a[key] > b[key] ? 1 : 0;
      if (comp !== 0) {
        return order === "asc" ? comp : -comp;
      }
    }
    return 0;
  });
};
