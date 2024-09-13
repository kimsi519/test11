// // dummy(mock)입니다. 올바르게 수정하세요.
// const debounce = (cb: any, delay: number) => (i: number) => {};
// const throttle = (cb: any, delay: number) => (i: number) => {};

// // function throttle...

// const debo = debounce((a: number) => console.log(a + 1), 500);
// for (let i = 10; i < 15; i++) debo(i); // 15 출력

// const thro = throttle((a: number) => console.log(a + 1), 500);
// for (let i = 10; i < 15; i++) thro(i); // 11 출력



const debounce = (cb: (arg: number) => void, delay: number) => {
  let time: ReturnType<typeof setTimeout> | null = null;
  
  return (i: number) => {
    if (time !== null) clearTimeout(time);

    time = setTimeout(() => {
      cb(i);
    }, delay);
  };
};

const throttle = (cb: (arg: number) => void, delay: number) => {
  let time = 0;

  return (i: number) => {
    const now = Date.now();
    if (now - time >= delay) {
      cb(i);
      time = now;
    }
  };
};

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
