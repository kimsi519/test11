// Debounce: 특정 이벤트가 발생한 후, 지정된 시간 동안 이벤트가 발생하지 않을 때만 콜백 함수를 실행
// Throttle: 지정된 시간 간격 동안 이벤트 핸들러가 한 번만 실행되도록 제한

const debounce = (cb, delay) => {
    let timeoutId;
  
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId); // 이전에 설정된 타이머를 취소
      }
      timeoutId = setTimeout(() => {
        cb(...args); 
      }, delay); // 새로 지정된 delay 후에 콜백 함수 호출
    };
  };
  

  const throttle = (cb, delay) => {
    let recentCall = 0;
  
    return (...args) => {
      const now = Date.now();
      if ((now - recentCall) >= delay) { // 현재 시간 - 가장 마지막 콜이 delay보다 크면 콜백 다시 호출 가능해짐
        recentCall = now;
        cb(...args);
      }
    };
  };
  

  
  const debo = debounce((a) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) debo(i); // 500ms 딜레이 후 마지막 i가 14일 때 call한 debo가 실행되어 15 출력
  
  const thro = throttle((a) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) thro(i); // 한번만 실행되도록 제한되므로 11출력
  