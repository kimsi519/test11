module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const dataRegex = new RegExp(data);
    const korean = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    const 가 = '가'.charCodeAt(); //44032
    const first = Math.floor('까'.charCodeAt() - '가'.charCodeAt());
    const last = Math.floor('개'.charCodeAt() - '가'.charCodeAt());

    const fs = firstSounds.split("");
    const regs = []

    for(let i=0; i<fs.length; i++){
      if(korean.includes(fs[i])) { //초성이 자음인 경우
        idx = korean.indexOf(fs[i]); 
        startReg = String.fromCharCode(가 + idx * 588);
        endReg = String.fromCharCode(가 + (idx+1) * 588 -1);
        regs.push(`[${startReg}-${endReg}]`)
      }
      else{ //초성이 숫자인 경우
        regs.push(fs[i]);
      }
    }
   
    const regex = new RegExp(regs.join(''));

    //배열에서 일치하는 단어 찾아서 반환
    return data.filter(item => regex.test(item))
  },
};

