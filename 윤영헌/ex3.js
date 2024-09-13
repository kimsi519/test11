Array.prototype.sortBy = function (sortProp = '') {
  // 분류 기준 객체로 만들기
  const parts = sortProp.split(',');

  const criterias = parts.map(part => {
    let criteria, method;
  
    if (part.indexOf(':') === -1) {
      criteria = part.trim();
      method = 'asc';
    } 
    else {
      [criteria, method] = part.split(':');
      method = method.trim() === '' ? 'asc' : method.trim();
    }
  
    return {
      criteria: criteria.trim(),
      method: method
    };
  });
  

  console.log(criterias)

  // 정렬
  this.sort(function(a, b) {
    for (const { criteria, method } of criterias) {
      if (a[criteria] > b[criteria]) {
        return method === 'asc' ? 1 : -1;
      }
      if (a[criteria] < b[criteria]) {
        return method === 'asc' ? -1 : 1;
      }
    }
    return 0;
  });
  
  return this;
};

const hong = { id: 1, name: 'Hong', city: 'Busan', dept: 1 };
const kim = { id: 2, name: 'Kim', city: 'Seoul', dept: 2 };
const lee = { id: 3, name: 'Lee', city: 'Daegu', dept: 2 };
const users = [lee, hong, kim];