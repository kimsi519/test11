// 랜덤한 시간 후에 Promise를 해결하는 함수
export const randTime = <T>(val: T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

// Promise.all을 재구현한 함수
export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = []; // 각 Promise의 결과를 저장할 배열
    let completedPromises = 0; // 완료된 Promise의 개수를 추적

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = value; // 성공한 Promise의 결과 저장
          completedPromises++; // 완료된 Promise 증가
          if (completedPromises === promises.length) {
            resolve(results); // 모든 Promise가 완료되면 결과 반환
          }
        })
        .catch((error) => reject(error)); // Promise 중 하나라도 실패하면 전체를 reject
    });
  });
}

// Promise.allSettled와 동일한 기능을 하는 함수
export function promiseAllSettled<T>(
  promises: Promise<T>[]
): Promise<{ status: "fulfilled" | "rejected"; value?: T; reason?: any }[]> {
  return new Promise((resolve) => {
    const results: { status: "fulfilled" | "rejected"; value?: T; reason?: any }[] = [];
    let completedPromises = 0; // 완료된 Promise의 개수 추적

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = { status: "fulfilled", value }; // 성공한 Promise의 결과 저장
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason }; // 실패한 Promise의 이유 저장
        })
        .finally(() => {
          completedPromises++; // 완료된 Promise 증가
          if (completedPromises === promises.length) {
            resolve(results); // 모든 Promise가 완료되면 결과 반환
          }
        });
    });
  });
}
