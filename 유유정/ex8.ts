type Callback<T extends any[]> = (...args: T) => void;

const debounceFn = <T extends any[]>(cb: Callback<T>, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
  
    return (...args: T) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  
  const throttleFn = <T extends any[]>(cb: Callback<T>, delay: number) => {
    let lastCall = 0;
  
    return (...args: T) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        cb(...args);
      }
    };
  };
  
  // 사용 예시
  const debo1 = debounceFn((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) debo1(i); // 15 출력
  
  const thro1 = throttleFn((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) thro1(i); // 11 출력