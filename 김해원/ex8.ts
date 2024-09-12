const debounce = (cb: (i: number) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;

  return (i: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      cb(i);
    }, delay);
  };
};

const throttle = (cb: (i: number) => void, delay: number) => {
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
