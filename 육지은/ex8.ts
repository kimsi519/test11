let Timer: number | NodeJS.Timeout;
Timer = 0;
const debounce1 = (cb: any, delay: number) => (i: number) => {
    clearTimeout(Timer);
    Timer = setTimeout(()=>cb(i), delay);
};

let isCalled: Boolean;
const throttle1 = (cb: any, delay: number) => (i: number) => {
    if(!isCalled){
        cb(i);
        isCalled = true;
        setTimeout(()=>{isCalled = false}, delay);
    }
};

const debo1 = debounce1((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo1(i); // 15 출력

const thro1 = throttle1((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro1(i); // 11 출력
