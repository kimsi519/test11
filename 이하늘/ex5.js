
module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    const f = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ','ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const ga = 44032;
    result = [];

    for (let word of data){
        let initial = "";

        for (let i=0; i<word.length; i++){

          let uni = word[i].charCodeAt(0);
          uni = uni - ga;
          let fn = parseInt(uni / 588);         
       
          if(typeof f[fn]=== 'undefined') 
            initial += word[i];

          else
            initial += f[fn];         
        }

        if(initial.includes(firstSounds))
          result.push(word);
    }
    return result;
  },
};
