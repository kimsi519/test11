const range = (s,e,step = s > e ? -1 : 1)=>{
    if (step===0 || s===e) {
      return [s];
    }

    if (e===undefined) {
        if (s<0) {
            e=-1;
        }
        else if (s>0) {
            e=s;
            s=1;
        }
        else return [0];
    }

    if ((s<e && step<0) || (s>e && step>0))  // 예외처리
        return [];
    

    const result = [];
    if(step<0) {
        for (let i=s;i>=e;i=parseFloat((i+step).toFixed(2))) { //소수점 둘쨰 자리까지 고정
          result.push(i);
        }
      }
    else {
      for (let i=s;i<=e;i=parseFloat((i+step).toFixed(2))) { 
        result.push(i);
      }
    } 
    return result;
};

module.exports = { range };

  
  console.log(range(1, 5, 1));  // [1, 2, 3, 4, 5]
  console.log(range(1, 10, 2));  // [1, 3, 5, 7, 9]
  console.log(range(1, 10));     // [1, 2, 3, 4,  5, 6, 7, 8, 9, 10]
  console.log(range(10, 1));     // [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  console.log(range(10, 1, -2)); // [10, 8, 6, 4, 2]
  console.log(range(7)); // [1, 2, 3, 4, 5, 6, 7] 
  console.log(range(100)); // [1, 2, 3, 4, 5, ..., 99, 100
  