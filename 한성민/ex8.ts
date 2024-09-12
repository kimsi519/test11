// dummy(mock)입니다. 올바르게 수정하세요.

let timer: number | NodeJS.Timeout;
timer=0;
const debounce = (cb: any, delay: number) => (i: number) => {
    clearTimeout(timer);
    timer = setTimeout(()=>cb(i), delay);
};

let isCalled: Boolean;
const throttle = (cb: any, delay: number) => (i: number) => {
    if(!isCalled){
        cb(i);
        isCalled = true;
        setTimeout(()=>{isCalled = false}, delay);
    }
};

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
