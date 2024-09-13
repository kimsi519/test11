// debounce 함수
const debounce = (cb: any, delay: number) => {
  // 마지막에 설정된 타이머 ID를 저장할 변수
  let timeoutId: NodeJS.Timeout | null = null;

  // 실제 실행되는 함수
  return (i: number) => {
    // 기존 타이머 있으면 취소
    if (timeoutId) clearTimeout(timeoutId);

    // 새로운 타이머 설정 (delay 이후에 콜백 실행)
    timeoutId = setTimeout(() => cb(i), delay);
  };
};

// throttle 함수
const throttle = (cb: any, delay: number) => {
  // 마지막 호출 시간을 저장할 변수
  let lastCall = 0;

  // 실제 실행되는 함수
  return (i: number) => {
    const now = Date.now(); // 현재 시간

    // 현재 시간이 마지막 호출 시간 + 지연 시간보다 크면 콜백 실행
    if (now - lastCall >= delay) {
      lastCall = now; // 마지막 호출 시간 업데이트
      cb(i); // 콜백 호출
    }
  };
};

// function throttle...

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
