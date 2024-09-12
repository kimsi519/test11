Array.prototype.sortBy = function (sortProp = "") {
  // Split by commas to handle multiple sorting properties
  const sortProps = sortProp.split(",").map((prop) => {
    // Split each property by colon to get the field and sort order
    const [key, order = "asc"] = prop.split(":");
    return { key, order };
  });

  return this.sort((a, b) => {
    // Iterate over each sorting property and compare
    for (let { key, order } of sortProps) {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    }
    return 0; // if all properties are equal, return 0
  });
};
