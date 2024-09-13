function debounce(func: (arg: number) => void, delay: number) { //numbers와 delay값 매개변수
    let timeoutId: NodeJS.Timeout | null = null;    //연속된 이벤트 중 마지막 이벤트만 실행
    return function (arg: number) {
        if (timeoutId) {
            clearTimeout(timeoutId);    // 새로운 호출 발생 시 이전꺼 취소
        }
        timeoutId = setTimeout(() => { 
            func(arg);  // 전달될 함수를 인자로 호출
        }, delay);
    };
}


function throttle(func: (arg: number) => void, delay: number) {
    let lastCall = 0; //throttle => 일정 시간 간격으로 발생
    return function (arg: number) {
        const now = Date.now(); //밀리 초 단위
        if (now - lastCall >= delay) { //현재시간 - 마지막콜시간 >= delay
            lastCall = now;
            func(arg);
        }
    };
}



const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력

