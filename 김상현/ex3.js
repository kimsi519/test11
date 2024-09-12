Array.prototype.sortBy = function (sortProp = '') {
  const [...lst] = sortProp.split(',');
  return this.slice().sort((a, b) => {
    for(let e of lst) {
      let [key, order] = e.split(':');
      if (a[key] > b[key]) return order === 'desc' ? -1 : 1;
      if (a[key] < b[key]) return order === 'desc' ? 1 : -1;
    }
  });
  
  return this;
};