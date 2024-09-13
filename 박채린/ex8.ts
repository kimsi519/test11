const debounce = <T extends (...args: any[]) => void>(cb: T, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
  
    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  
  const throttle = <T extends (...args: any[]) => void>(cb: T, delay: number) => {
    let lastCall = 0;
  
    return (...args: Parameters<T>) => {
      const now = Date.now();
  
      if (now - lastCall >= delay) {
        lastCall = now;
        cb(...args);
      }
    };
  };
  
  const debo = debounce((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) debo(i);  
  
  const thro = throttle((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) thro(i);  
  