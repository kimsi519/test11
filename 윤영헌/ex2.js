// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
    if (end === undefined && start>0) {
        end = start;
        start = 1;
    } else if(end === undefined && start===0){
        return [0];
    } else if(end === undefined && start<0){
        end = -1;
    }

    const arr = [];

    if(step>0){
        for(let i=start; i<=end; i+=step){
            arr.push(Number(i.toFixed(10)));
        }
        if(step%1 != 0){
            if (arr[arr.length - 1] !== end) {
                arr.push(end);
            }
        }
    }else if(step<0){
        for(let i=start; i>=end; i+=step){
            arr.push(Number(i.toFixed(10)));
        }
        if(step%1 != 0){
            if (arr[arr.length - 1] !== end) {
                arr.push(end);
            }
        }
    }else if(step === 0){
        arr.push(Number(start.toFixed(10)));
    }
    return arr;
};

module.exports = { range };