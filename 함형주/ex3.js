Array.prototype.sortBy = function (sortProp = '') {
  let sortProp_arr = sortProp.split(',');
  
  this.sort((a,b)=>{
    for(let i of sortProp_arr){
      let [key,order] = i.split(':');
      order = order?? 'asc';

      if(a[key]>b[key]){
        if(order==='asc')return 1;
        else return -1;
      }else if(a[key]<b[key]){
        if(order==='desc')return 1;
        else return -1;
      }
    }
//완전히 동일
    return 0;
  })
  return this;
};