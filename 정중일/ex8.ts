// dummy(mock)입니다. 올바르게 수정하세요.
const myDebounce = (cb: any, delay: number) => {
  let timerRef: NodeJS.Timeout | null = null;
  return <T>(...args: T[]) => {
    if (timerRef) {
      clearTimeout(timerRef);
    }
    timerRef = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
const myThrottle = (cb: any, delay: number) => {
  let timerRef: NodeJS.Timeout | null = null;
  return <T>(...args: T[]) => {
    if (timerRef) {
      return;
    }
    timerRef = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

// function throttle...

const myDebo = myDebounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) myDebo(i); // 15 출력

const myThro = myThrottle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) myThro(i); // 11 출력
