
const debouncesh = (cb: any, delay: number) => {
  let timer: NodeJS.Timeout | undefined;

  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => cb.apply(this, args), delay);
  };
};

const throttlesh = (cb: any, delay: number) => {
    let lastCall = 0;
  
    return function (this: any, ...args: any[]) {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        cb.apply(this, args);
      }
    };
  };

const debosh = debouncesh((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debosh(i); // 15 출력

const throsh = throttlesh((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) throsh(i); // 11 출력
