// function debounce(func, delay) {
//     let timer;
//     return function(...args) {
//         clearTimeout(timer);
//         timer = setTimeout(() => func.apply(this, args), delay);
//     };
// }

// const searchBox = document.getElementById('searchBox');

// searchBox.oninput = debounce(() => {
//     const query = searchBox.value;
//     console.log(new Date().toISOString(), 'search>>', query);
// }, 500);

const debounce = (cb: any, delay: number) => (i: number) => {

};
const throttle = (cb: any, delay: number) => (i: number) => {};

// function throttle...

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
