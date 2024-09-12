export const randTime = <T>(val: T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  const results: T[] = [];
  let completed = 0;
  let hasError = false;
  let error: any = null;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
        .then(value => {
          if (hasError) return;
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(err => {
          if (hasError) return;
          hasError = true;
          error = err;
          reject(error);
        });
    });
  });
}

export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
  // 프로미스들을 처리하여 성공 및 실패 상태를 반환하는 프로미스 배열을 생성합니다.
  const wrappedPromises = promises.map(promise =>
    promise
      .then(
        value => ({ status: 'fulfilled', value }),
        reason => ({ status: 'rejected', reason })
      )
  );

  // 모든 프로미스가 완료될 때까지 기다리고 결과를 반환합니다.
  return promiseAll(wrappedPromises) as Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>>;
}
