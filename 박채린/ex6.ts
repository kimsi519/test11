export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    let completed = 0;
    const results: T[] = [];
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

export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
  return new Promise((resolve) => {
    let completed = 0;
    const results: Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }> = [];
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

export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

