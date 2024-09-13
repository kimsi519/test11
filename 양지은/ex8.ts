
// 디바운스
const debounce_ = (cb: (a: number) => void, delay: number) => {
    let timer: ReturnType<typeof setTimeout> | null = null; // setTimeout의 타입 

    return (i: number) => {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            cb(i);
        }, delay);
    };
};

// 쓰로틀
const throttle_ = (cb: (a: number) => void, delay: number) => {
    let timer: number;

    return (i: number) => {
        const now = (new Date()).getTime();
        if (now - timer < delay) {
            return;
        }
        timer = now;
        cb(i);
    }
}

// function throttle...

const debo_ = debounce_((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo_(i); // 15 출력

const thro_ = throttle_((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro_(i); // 11 출력
