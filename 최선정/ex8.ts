// dummy(mock)입니다. 올바르게 수정하세요.
const debounce = (cb: any, delay: number) => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    return (i: number) => {
      if (timer) clearTimeout(timer); 
      timer = setTimeout(() => cb(i), delay); 
    };
  };
  
  const throttle = (cb: any, delay: number) => {
    let lastCall = 0;
    return (i: number) => {
      const now = Date.now();
      if (now - lastCall >= delay) { 
        lastCall = now;
        cb(i);
      }
    };
  };
  
  const debo = debounce((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) debo(i); // 15 출력
  
  const thro = throttle((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) thro(i); // 11 출력
  