// // dummy(mock)입니다. 올바르게 수정하세요.
// const debounce = (cb: any, delay: number) => (i: number) => {};
// const throttle = (cb: any, delay: number) => (i: number) => {};

// // function throttle...

// const debo = debounce((a: number) => console.log(a + 1), 500);
// for (let i = 10; i < 15; i++) debo(i); // 15 출력

// const thro = throttle((a: number) => console.log(a + 1), 500);
// for (let i = 10; i < 15; i++) thro(i); // 11 출력

// Debounce function implementation
const debounce = (cb, delay) => {
    let timeoutId;
  
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };
  
  // Throttle function implementation
  const throttle = (cb, delay) => {
    let lastCall = 0;
  
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        cb(...args);
      }
    };
  };
  
  // Example usage
  
  const debo = debounce((a) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) debo(i); // Expected output: 15 (after 500ms delay)
  
  const thro = throttle((a) => console.log(a + 1), 500);
  for (let i = 10; i < 15; i++) thro(i); // Expected output: 11 (once every 500ms)
  