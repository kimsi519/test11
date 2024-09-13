// dummy(mock)입니다. 올바르게 수정하세요.

let timer: number | NodeJS.Timeout;
timer=0;
const debouncing = (cb: any, delay: number) => (i: any) => {
    clearTimeout(timer);
    timer = setTimeout(()=>cb(i), delay);
};

let isCalled: Boolean;
const throttling = (cb: any, delay: number) => (i: any) => {
    if(!isCalled){
        cb(i);
        isCalled = true;
        setTimeout(()=>{isCalled = false}, delay);
    }
};

// function throttle...
const d = debouncing((a: number) => console.log('debounce: ', a + 1), 500);
for (let i = 10; i < 15; i++) d(i); // 15 출력

const t = throttling((a: number) => console.log('throttle: ',a + 1), 500);
for (let i = 10; i < 15; i++) t(i); // 11 출력