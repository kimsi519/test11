// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
    let arr = [];
    if(step===0 || start===end)return [start];
    //end가 없을때
    if(end===undefined){
        if(start>0){
            end = start;
            start=1;
        }else if(start<0){
            end =-1;
        }else{
            return [0];
        }
    }
    //예외처리
    if((start-end)*step>0)return []; 
    //배열 반환
    if(start<=end){
        for(let i=start; i<=end; i+=step){

            arr.push(parseFloat(i.toFixed(6)));
            if (Math.abs(i + step - end) < 1e-10) {
                arr.push(end);
                break;
            }
        }
        return arr;
    }else{
        for(let i=start; i>=end; i+=step){
            arr.push(parseFloat(i.toFixed(6)));
            if (Math.abs(i + step - end) < 1e-10) {
                arr.push(end);
                break;
            }
        }
        return arr;
    }
};

module.exports = { range };
