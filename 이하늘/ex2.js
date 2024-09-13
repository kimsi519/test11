const range = function f(s, e, step = s > e ? -1 : 1){
  const variable = arguments.length;

  if (variable==3){
    if ((s-e) * step > 0)
      return [];
    
    else if(step === 0)
      return [s];
          
    else
      return Array.from({length:Math.floor((e-s)/step)+1}, (_, i) => Number((s + (i * step)).toFixed(12)));
  }

  else if(variable==2){
    if(s === e)
      return [s];
        
    else
      return Array.from({length:Math.floor((e-s)/step)+1}, (_, i) => Number((s + (i * step)).toFixed(12)));
  }
        
  else{
    s > 0 && (e = s, s = 1);
    s < 0 && (e = -1);
    if (s === 0)
      return [0];
          
    return Array.from({length:Math.floor((e-s)/step)+1}, (_, i) => Number((s + (i * step)).toFixed(12)));
  }
  
}


module.exports = { range };