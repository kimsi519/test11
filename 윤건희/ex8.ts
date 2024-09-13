function debounce<T extends (...args: any[]) => void>(cb: T, delay: number): (...args: Parameters<T>) => void {
    let id: NodeJS.Timeout | null = null;
  
    return (...args: Parameters<T>) => {

        if (id)
            clearTimeout(id);
        id = setTimeout(() => {
            cb(...args);
        }, delay);
    };
}
  
  function throttle<T extends (...args: any[]) => void>(cb: T, delay: number): (...args: Parameters<T>) => void {
    let last = 0;
  
    return (...args: Parameters<T>) => {
      const now = Date.now();
  
      if (now - last >= delay) {
        last = now;
        cb(...args);
      }
    };
  }
  
  // 테스트
  const debo = debounce((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) debo(i); //15(마지막 호출)
  
  const thro = throttle((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) thro(i); //11(첫 호출)  