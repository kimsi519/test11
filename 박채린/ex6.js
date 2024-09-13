"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randTime = void 0;
exports.promiseAll = promiseAll;
exports.promiseAllSettled = promiseAllSettled;
function promiseAll(promises) {
    return new Promise((resolve, reject) => {
        let completed = 0;
        const results = [];
        const total = promises.length;
        if (total === 0) {
            resolve(results);
        }
        promises.forEach((promise, index) => {
            promise
                .then(result => {
                results[index] = result;
                completed++;
                if (completed === total) {
                    resolve(results);
                }
            })
                .catch(error => {
                results[index] = error;
                completed++;
                if (completed === total) {
                    resolve(results);
                }
            });
        });
    });
}
function promiseAllSettled(promises) {
    return new Promise((resolve) => {
        let completed = 0;
        const results = [];
        const total = promises.length;
        if (total === 0) {
            resolve(results);
        }
        promises.forEach((promise, index) => {
            promise
                .then(value => {
                results[index] = { status: 'fulfilled', value };
                completed++;
                if (completed === total) {
                    resolve(results);
                }
            })
                .catch(reason => {
                results[index] = { status: 'rejected', reason };
                completed++;
                if (completed === total) {
                    resolve(results);
                }
            });
        });
    });
}
// Example usage
const randTime = (val) => new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));
exports.randTime = randTime;
