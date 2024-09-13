export const randTime = <T>(val: T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

export const promiseAllSettled = <T>(
  promises: Promise<T>[]
): Promise<PromiseSettledResult<T>[]> => {
  // 반환 타입을 Promise<PromiseSettledResult<T>[]>로 지정
  // PromiseSettledResult<T> =  PromiseFulfilledResult<T> | PromiseRejectedResult
  return new Promise((result) => {
    let count = promises.length;
    const returnArray: PromiseSettledResult<T>[] = [];

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        // resolve: PromiseFulfilledResult<T>
        .then((value) => {
          returnArray[index] = { status: 'fulfilled', value };
          count -= 1;
        })
        //reject: PromiseRejectedResult
        .catch((e) => {
          returnArray[index] = {
            status: 'rejected',
            reason: e,
          };
          count -= 1;
        })
        // finally
        .finally(() => !count && result(returnArray));
    });
  });
};
