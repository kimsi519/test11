// dummy(mock)입니다. 올바르게 수정하세요.
const debounce = (cb: any, delay: number) => {
    let timer: NodeJS.Timeout | null;
    return (i: number) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => cb(i), delay);
    }
};

const throttle = (cb: any, delay: number) => {
    let timer2: NodeJS.Timeout | null; 
    return (i: number) => {
        if (timer2) return;
        timer2 = setTimeout(() => {
            cb(i);
            timer2 = null;
        }, delay);
    }
};

// function throttle...

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
