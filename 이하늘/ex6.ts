
export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<{ status: string; value?: T; reason?: any }[]> {
  return new Promise(resolve => {
    const results: { status: string; value?: T; reason?: any }[] = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      promise
        .then(value => {
          results[index] = { status: 'fulfilled', value };
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
        })
        .finally(() => {
          completed += 1;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
