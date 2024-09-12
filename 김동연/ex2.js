const range = (start, end, step = start > end ? -1 : 1) => {
    const result = [];

    if(step === 0 || start === end){ // start값과 end 값이 같다면
        return [start]; 
    }
    if((start > end && step > 0) || (start < end && step < 0)){
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
    } 

    // 소수점 연산을 위해 EPSILON값 추가
    for(let i = start; (step > 0) ? i < end + (Number.EPSILON * 100) : i >= end - (Number.EPSILON * 100); i += step){
        result.push(Math.round((i + Number.EPSILON) * 100) / 100);
    }
    return result;
};

module.exports = { range };