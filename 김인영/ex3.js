Array.prototype.sortBy = function (sortProp = '') {
  const sortOrder = sortProp.split(',').map(prop => {
    const [key, order] = prop.trim().split(':');
    return { key, order: order === 'desc' ? -1 : 1};
  });

  const compare = (a,b) =>{
    for(let {key, order} of sortOrder){
      const aValue = a[key];
      const bValue = b[key];

      if(aValue < bValue) return -1 * order;
      if(aValue > bValue) return 1 * order;
    }
    return 0;
  };

  return this.slice().sort(compare);
};
