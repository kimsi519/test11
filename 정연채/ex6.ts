export const randTime = <T>(val: T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(
  promises: Promise<T>[]
): Promise<PromiseSettledResult<T>[]> {
  return new Promise((resolve) => {
    const results: PromiseSettledResult<T>[] = [];
    let cnt = 0;

    const result = (i: number, v: PromiseSettledResult<T>) => {
      results[i] = v;
      cnt++;
      if (cnt === promises.length) {
        resolve(results);
      }
    };

    promises.forEach((promise, i) => {
      promise
        .then((value) =>
          result(i, { status: "fulfilled", value } as const)
        )
        .catch((reason) =>
          result(i, { status: "rejected", reason } as const)
        );
    });
  });
}

export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let cnt = 0;

    const result = (i: number, v: T) => {
      results[i] = v;
      cnt++;
      if (cnt === promises.length) {
        resolve(results);
      }
    };

    promises.forEach((promise, i) => {
      promise.then((v) => result(i, v)).catch(reject);
    });
  });
}