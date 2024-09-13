// dummy(mock)입니다. 올바르게 수정하세요.
const debounce_suminlee = <T extends any[]>(
  cb: (...args: T) => void,
  delay: number
) => {
  let timer: NodeJS.Timeout | null = null;
  // debounce 되는 함수
  return (...args: any) => {
    // 기존 타이머가 있다면 제거
    if (timer) clearTimeout(timer);
    // 새 타이머 설정
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

const throttle_suminlee = <T extends any[]>(
  cb: (...args: T) => void,
  delay: number
) => {
  let lastCalled = 0;
  // throttle 되는 함수
  return (...args: T) => {
    const now = Date.now(); // 현재 시각을 기준으로 마지막 실행 시간이 delay보다 크다면 cb 호출
    if (now - lastCalled >= delay) {
      cb(...args);
      lastCalled = now; // 마지막 호출 업데이트
    }
  };
};

// function throttle...

const debo_suminlee = debounce_suminlee((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo_suminlee(i); // 15 출력

const thro_suminlee = throttle_suminlee((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro_suminlee(i); // 11 출력
