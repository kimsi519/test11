// Debounce 함수: 마지막 호출 이후 delay 후 실행
const customDebounce = (cb: (i: number) => void, delay: number) => {
  let timeout: NodeJS.Timeout;
  return (i: number) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => cb(i), delay);
  };
};

// Throttle 함수: delay 간격으로 실행
const customThrottle = (cb: (i: number) => void, delay: number) => {
  let lastCall = 0;
  return (i: number) => {
    const now = new Date().getTime();
    if (now - lastCall >= delay) {
      lastCall = now;
      cb(i);
    }
  };
};

// 테스트 코드
const customDebo = customDebounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) customDebo(i); // 15 출력

const customThro = customThrottle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) customThro(i); // 11 출력
