Array.prototype.sortBy = function (sortProp = '') {
  const arr = [];
  const props = sortProp.split(",");

  for(let p of props){
    arr.push(p.split(":"));
  }

  for(let i = arr.length-1; i>=0; i--){
    if(arr[i].includes('name')){
      if(arr[i].includes('desc')){
        this.sort((a, b) => a.name > b.name ? -1 : 1);
      }else{
        this.sort((a, b) => a.name < b.name ? -1 : 1);
      }
    }
    else if(arr[i].includes('id')){
      if(arr[i].includes('desc')){
        this.sort((a, b) => a.id > b.id ? -1 : 1);
      }else{
        this.sort((a, b) => a.id < b.id ? -1 : 1);
      }
    }
    else if(arr[i].includes('city')){
      if(arr[i].includes('desc')){
        this.sort((a, b) => a.city > b.city ? -1 : 1);
      }else{
        this.sort((a, b) => a.city < b.city ? -1 : 1);
      }
    }
    else if(arr[i].includes('dept')){
      if(arr[i].includes('desc')){
        this.sort((a, b) => a.dept > b.dept ? -1 : 1);
      }else{
        this.sort((a, b) => a.dept < b.dept ? -1 : 1);
      }
    }  
  }
  
  return this;
};