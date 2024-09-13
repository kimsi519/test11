function debounce<T extends (...args: any[]) => void>(
  cb: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>): void => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => cb(...args), delay);
  };
}

// function throttle...

function throttle<T>(cb: (arg: T) => void, delay: number): (arg: T) => void {
  let lastCalled = 0;

  return (arg: T): void => {
    const now = Date.now();
    if (now - lastCalled >= delay) {
      lastCalled = now;
      cb(arg);
    }
  };
}

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
