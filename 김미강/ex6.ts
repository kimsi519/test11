export const randTime = <T>(val: T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(
  promises: Promise<T>[]
): Promise<PromiseSettledResult<T>[]> {
  return new Promise((resolve) => {
    const results: PromiseSettledResult<T>[] = [];
    let endCount = 0;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          endCount++;
          if (endCount === promises.length) {
            resolve(results);
          }
        });
    });
  });
}
