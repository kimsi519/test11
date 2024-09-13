Array.prototype.sortBy = function (sortKey = '') {
  const props = sortKey.split(',').map(prop => {
    const [key, dir] = prop.split(':');

    return { key, dir: dir ? dir : 'asc' };
  }).filter(prop => prop.key); 
  
  //정렬
  return this.slice().sort((a, b) => {
    for (const { key, dir } of props) {
      const x = a[key];
      const y = b[key];

      //undefined는 항상 작은거로 여기기
    if (x === undefined || y === undefined) {
      if (x === undefined) return 1; //x가 undefined일 때 1 반환
      else return -1; //y가 undefined일 때 -1 반환
    }

      if (x > y) return dir === 'asc' ? 1 : -1;
      if (x < y) return dir === 'asc' ? -1 : 1;
    }
    return 0; //값이 같으면 순서유지
  });
};

module.exports = {};
