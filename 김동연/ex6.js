"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randTime = void 0;
exports.promiseAllSettled = promiseAllSettled;
// 랜덤시간 후 반환
var randTime = function (val) {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve(val); // 반환
        }, Math.random() * 1000); // 랜덤 시간 후에 실행
    });
};
exports.randTime = randTime;
// 성공/실패 상태를 반환하는 함수
function promiseAllSettled(promises) {
    return new Promise(function (resolve) {
        var results = new Array(promises.length); // 결과를 저장 배열 
        var completed = 0; // 성공 promise 개수
        promises.forEach(function (promise, index) {
            promise
                .then(function (value) {
                results[index] = { status: 'fulfilled', value: value }; // 성공 시 결과 저장
            })
                .catch(function (reason) {
                results[index] = { status: 'rejected', reason: reason }; // 실패 시 결과 저장
            })
                .finally(function () {
                completed++;
                if (completed === promises.length) { //모든 promise 완료
                    resolve(results);
                }
            });
        });
    });
}
