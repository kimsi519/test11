// dummy(mock)입니다. 올바르게 수정하세요.
// const debounce = (cb: any, delay: number) => (i: number) => {};
// const throttle = (cb: any, delay: number) => (i: number) => {};
// function throttle...
var debo = debounce(function (a) { return console.log(a + 1); }, 500);
for (var i = 10; i < 15; i++)
    debo(i); // 15 출력
var thro = throttle(function (a) { return console.log(a + 1); }, 500);
for (var i = 10; i < 15; i++)
    thro(i); // 11 출력
function debounce(func, delay) {
    var timeoutId = null;
    return function (arg) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(function () {
            func(arg);
        }, delay);
    };
}

function throttle(func, delay) {
    var lastCall = 0;
    return function (arg) {
        var now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(arg);
        }
    };
}
