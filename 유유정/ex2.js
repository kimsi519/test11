// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {

    const result = [];

    if (start === end || step===0) return [start]; //배열이 시작하자마자 끝나는 경우


    // 매개변수가 1개인 경우
    if(end ==undefined){
        if(start >0){
            end = start;
            start = 1;
        }
        else if(start < 0){
            end = -1;

        }
        else return [start];
    }
    
    

    //배열 성립이 안되는 경우, 빈 배열 반환
    if ((start < end && step <= 0) || (start > end && step >= 0)) return []; 


    //step이 소수일경우를 포함하기 위해, 소수점 자리 수 계산
    const decimalLength = step.toString().includes('.') ? step.toString().split('.')[1].length : 0;


    for (let i = start; (step > 0) ? i <= end : i >= end; i = parseFloat((i+step).toFixed(decimalLength))) {
        
            result.push(parseFloat(i.toFixed(decimalLength)));
    }


    return result;
};

module.exports = { range };
