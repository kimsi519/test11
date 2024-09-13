export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

/*

https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled

Promise.allSettled

각 Promise의 이행 여부와 관계없이 그 결과를 배열로 반환
=> 반환값은 "Promise 객체"
=> 이 Promise 객체는 모든 입력 Promise가 완료된 후 각 Promise의 결과를 담은 "객체들의 배열"을 반환

[
   {status: "fulfilled", value: 33},
   {status: "fulfilled", value: 66},
   {status: "fulfilled", value: 99},
   {status: "rejected",  reason: Error: an error}
]

*/

// promiseAllSettled 구현
export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
  return new Promise(resolve => {
    const results: Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }> = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      promise
          .then(value => {
              results[index] = { status: 'fulfilled', value };
          })
          .catch(reason => {
              // Promise 거부 -> 이 경우 value가 아니라 reason 저장
              results[index] = { status: 'rejected', reason };
          })
          .finally(() => {
              completed += 1;
              // 완료된 Promise 개수 체크
              if (completed === promises.length) {
                  resolve(results);
              }
          });
    });
});
}
