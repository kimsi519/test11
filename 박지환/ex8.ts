// dummy(mock)입니다. 올바르게 수정하세요.
// debounce 함수
function debounce<T extends (...args: any[]) => void>(cb: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: NodeJS.Timeout | null = null;
    return (...args: Parameters<T>) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
  
  // throttle 함수
  function throttle<T extends (...args: any[]) => void>(cb: T, delay: number): (...args: Parameters<T>) => void {
    let lastCall = 0;
    return (...args: Parameters<T>) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        cb(...args);
      }
    };
  }
  
  // 테스트
  const debo = debounce((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) debo(i); // 마지막 호출인 14에 대해 15 출력
  
  const thro = throttle((a: number) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) thro(i); // 처음 호출인 10에 대해 11 출력
  