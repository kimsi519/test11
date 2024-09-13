export const randTime = <T>(val: T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

// promiseAll 함수: 모든 프로미스가 성공적으로 완료되면 resolve, 하나라도 실패하면 reject.
function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = value; // 프로미스가 성공하면 해당 값을 저장
          completedCount += 1;

          // 모든 프로미스가 완료되었으면 resolve
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          // 하나라도 실패하면 reject
          reject(error);
        });
    });
  });
}

// promiseAllSettled 함수: 모든 프로미스가 완료된 후, 각각의 상태와 결과를 배열로 반환
export function promiseAllSettled<T>(
  promises: Promise<T>[]
): Promise<{ status: "fulfilled" | "rejected"; value?: T; reason?: any }[]> {
  return new Promise((resolve) => {
    const results: {
      status: "fulfilled" | "rejected";
      value?: T;
      reason?: any;
    }[] = [];
    let completedCount = 0;

    // 각 프로미스에 대해 처리
    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          // 프로미스가 성공적으로 완료된 경우
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          // 프로미스가 실패한 경우
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completedCount += 1;
          // 모든 프로미스가 완료되면 resolve합니다.
          if (completedCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
