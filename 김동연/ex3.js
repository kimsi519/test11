Array.prototype.sortBy = function (sortProp = '') {
  const commands = sortProp.split(',').map(item => item.split(':'));
  
  return this.slice().sort((a, b) => {
    for (const [key, order] of commands) {
      if (a[key] > b[key]) return order === 'desc' ? -1 : 1;
      if (a[key] < b[key]) return order === 'desc' ? 1 : -1;
    }
    return 0;
  });

};
