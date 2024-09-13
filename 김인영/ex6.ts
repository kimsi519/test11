export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

  export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: string, value?: T, reason?: any }>> {
    return new Promise((resolve) => {
      const results: Array<{ status: string, value?: T, reason?: any }> = [];
      let completed = 0;
  
      promises.forEach((promise, index) => {
        // 프로미스가 성공적으로 처리된 경우
        promise
          .then((value) => {
            results[index] = { status: 'fulfilled', value };
          })
          .catch((reason) => {
            // 프로미스가 실패한 경우
            results[index] = { status: 'rejected', reason };
          })
          .finally(() => {
            completed++;
            // 모든 프로미스가 처리되면 결과를 반환
            if (completed === promises.length) {
              resolve(results);
            }
          });
      });
    });
  }
  