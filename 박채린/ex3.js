Array.prototype.sortBy = function (sortProp = '') {
  if (!sortProp) return this;

  const sortCriteria = sortProp.split(',').map(criteria => {
      const [key, order] = criteria.split(':');
      return {
          key: key.trim(),
          order: order === 'desc' ? -1 : 1
      };
  });

  return this.sort((a, b) => {
      for (const { key, order } of sortCriteria) {
          if (key === '') continue;

          const aValue = a[key];
          const bValue = b[key];

          if (aValue < bValue) return -1 * order;
          if (aValue > bValue) return 1 * order;
      }
      return 0; 
  });
};
