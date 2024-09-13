function initial_word(word){
  const Choseung_list = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
  let choseung = '';

  for (let i of word){
    if(i.charCodeAt(0)>='가'.charCodeAt(0) && i.charCodeAt(0)<='힇'.charCodeAt(0)){
      const index =  Math.floor((i.charCodeAt(0)-'가'.charCodeAt(0))/588);
      choseung +=Choseung_list[index];
    }else{
      choseung += i;
    }
  }
  return choseung;
}

module.exports = {
  searchByKoreanInitialSound: (data, firstSounds) => {
    //정규식
    const regular_ex = new RegExp( `.*${firstSounds}.*`);

    return data.filter((item) =>{
      let initial = initial_word(item);
      return regular_ex.test(initial);
    })
  },
};