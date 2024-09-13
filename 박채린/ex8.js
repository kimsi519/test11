"use strict";
// dummy(mock)입니다. 올바르게 수정하세요.
const debounce = (cb, delay) => (i) => { };
const throttle = (cb, delay) => (i) => { };
// function throttle...
const debo = debounce((a) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++)
    debo(i); // 15 출력
const thro = throttle((a) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++)
    thro(i); // 11 출력
