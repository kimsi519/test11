// range 함수를 작성하세요.
const range = (start, end, step = start > end ? -1 : 1) => {
    const result = [];
    if(step === 0 || start === end){ // start값과 end 값이 같다면
        return [start]; 
    }if((start > end && step >= 0) || (start < end && step <= 0)){
        return []; 
    } 

    if(end === undefined){ // 만약 end 값이 비어 있다면
        if(start > 0){
            end = start;
            start = 1;
        }
        else if(start < 0){
            end = -1;
        }
        else{
            return [0];
        }
        
    } // 이 부분 코드 예쁘게 고치기


    // 소수점.. 처리 입실론?
    for(let i = start; (step > 0) ? i <= end : i >= end; i+= step){
        result.push(i);
    }
    return result;

module.exports = { range };
