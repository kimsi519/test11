// debounce 함수
const debounce = (cb: (i: number) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout | null = null;
    return (i: number) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => cb(i), delay);
    };
};

// throttle 함수
const throttle = (cb: (i: number) => void, delay: number) => {
    let isThrottled = false;
    return (i: number) => {
        if (!isThrottled) {
            cb(i);
            isThrottled = true;
            setTimeout(() => {
                isThrottled = false;
            }, delay);
        }
    };
};

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
