Array.prototype.sortBy = function (sortProp = '') {

  const str = sortProp.split(',').map(s => {
    const [key, order] = s.split(':');
    return {
      key: key.trim(),
      order: (order && order.trim().toLowerCase()) === 'desc' ? -1 : 1 
    };
  });

  const compare = (a, b, key, order) => {
    if (a[key] > b[key]) return order;
    if (a[key] < b[key]) return (-1) * order;
    return 0;
  };

  return this.sort((a, b) => {
    return str.reduce((result, { key, order }) => {

      if (result !== 0) 
        return result;

      return compare(a, b, key, order);
    }, 0); 
  });
};