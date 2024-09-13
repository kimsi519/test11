
// Debounce 함수 구현
const myDebounce = (cb: (i: number) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (i: number) => {
        clearTimeout(timer);
        timer = setTimeout(() => cb(i), delay);
    };
};

// Throttle 함수 구현
const myThrottle = (cb: (i: number) => void, delay: number) => {
    let lastCall = 0;
    return (i: number) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            cb(i);
        }
    };
};


const de = myDebounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) de(i); //15

// Throttle 사용 예시
const th = myThrottle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) th(i); 
