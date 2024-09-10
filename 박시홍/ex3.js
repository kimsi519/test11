// Array.prototype.sortBy = function (sortProp = '') {
//   return this;
// };

Array.prototype.sortBy = function(sortProp = '') {
  // Parse sort properties
  const criteria = sortProp.split(',').map(prop => {
    const [key, order] = prop.split(':');
    return { key, order: order === 'desc' ? -1 : 1 };
  });

  // Create a comparator function that processes the criteria in reverse
  const compare = (a, b) => {
    for (let i = criteria.length - 1; i >= 0; i--) {
      const { key, order } = criteria[i];
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) return -order;
      if (aValue > bValue) return order;
    }
    return 0; // Values are equal for all criteria
  };

  return this.slice().sort(compare); // Return a sorted copy of the array
};