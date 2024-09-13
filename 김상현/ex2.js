// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
    const arr = []
    if(end === undefined) { // 인수가 하나만 주어졌을 때
        if(start > 0) { // 인수가 양수이면 1부터 n까지
            end = start;
            start = 1;
        }
        else if(start < 0) { // 인수가 음수이면 n부터 -1까지
            end = -1;
        }
        else { // 인수가 0이면
            arr.push(0);
        }
    }
    if(step > 0) { // 공차가 양수이면
        for(let i=start; Number(i.toFixed(10))<=end; i = i+step) {
            arr.push(Number(i.toFixed(10)));
        }
    }
    else if(step < 0) { // 공차가 음수이면
        for(let i=start; Number(i.toFixed(10))>=end; i = i+step) {
            arr.push(Number(i.toFixed(10)));
        }
    }
    else {
        arr.push(start);
    }
    return arr;
 };

//range(5, 5, 0);
module.exports = { range };
