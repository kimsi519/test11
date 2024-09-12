// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
    const arr = []
    if(end === undefined) {
        if(start > 0) {
            end = start;
            start = 1;
        }
        else if(start < 0) {
            end = -1;
        }
        else {
            arr.push(0)
        }
    }
    if(step > 0) {
        for(let i=start; i<=end; i = i+step) {
            arr.push(Number(i.toFixed(10)))
        }
    }
    else if(step < 0) {
        for(let i=start; i>=end; i = i+step) {
            arr.push(Number(i.toFixed(10)))
        }
    }
    else {
        arr.push(start)
    }
    console.log(arr);
    return arr;
 };

 range(-5)
//range(5, 5, 0);
module.exports = { range };
