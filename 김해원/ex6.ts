interface FailureResult {
  status: "rejected";
  reason: any;
}
interface SucessfulResult<T> {
  status: "fulfilled";
  value: T;
}

type PromiseResult<T> = SucessfulResult<T> | FailureResult;

export const randTime = <T>(val: T): Promise<T> => {
  return new Promise((resolve) =>
    setTimeout(resolve, Math.random() * 1000, val)
  );
};

export function promiseAllSettled<T>(
  promises: Promise<T>[]
): Promise<PromiseResult<T>[]> {
  return promiseAll(
    promises.map((promise) =>
      promise
        .then((value) => ({ status: "fulfilled", value } as PromiseResult<T>))
        .catch((reason) => ({ status: "rejected", reason } as PromiseResult<T>))
    )
  );
}

function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  if (promises.length === 0) return Promise.resolve([]);

  let resolvedCount = 0;
  const results: T[] = new Array(promises.length);

  return new Promise((resolve, reject) => {
    const handleResult = (index: number, value: T) => {
      results[index] = value;
      resolvedCount++;
      if (resolvedCount === promises.length) {
        resolve(results);
      }
    };

    promises.forEach((promise, index) => {
      promise
        .then((value) => handleResult(index, value))
        .catch((error) => reject(error));
    });
  });
}
