// debounce 함수 수정
const debounce = (cb: (a: number) => void, delay: number): ((i: number) => void) => {
    let timeout: NodeJS.Timeout | null = null;
    return (i: number) => {
        if (timeout) clearTimeout(timeout); // 이전 타이머 제거
        timeout = setTimeout(() => {
            cb(i); // 마지막 호출 시 콜백 실행
        }, delay); // 지연 시간 후 실행
    };
};

// throttle 함수 수정
const throttle = (cb: (a: number) => void, delay: number): ((i: number) => void) => {
    let lastCall = 0; // 마지막 호출 시간 저장
    return (i: number) => {
        const now = new Date().getTime(); // 현재 시간
        if (now - lastCall >= delay) { // 지연 시간이 지나면 실행
            lastCall = now; // 마지막 호출 시간 업데이트
            cb(i); // 콜백 실행
        }
    };
};

// 테스트 코드
const debo = debounce((a: number) => console.log("Debounced:", a + 1), 500);
for (let i = 10; i < 15; i++) {
    debo(i); // 마지막 값 15가 출력될 것으로 예상
}

const thro = throttle((a: number) => console.log("Throttled:", a + 1), 500);
for (let i = 10; i < 15; i++) {
    thro(i); // 첫 번째 값 11만 출력될 것으로 예상
}
