export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(promises: Promise<T>[]):Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
  //
  return new Promise((resolve) => {
    const result: Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }> = [];
    
    
    let sum = 0;

    promises.forEach((promise, i) => {
      promise
        .then((value) => {
          result[i] = { status : 'fulfilled', value };
        })
        .catch((reason) => {
          result[i] = { status : 'rejected', reason };
        })
        .finally(() => {
          sum++;
          if (sum === promises.length){
            resolve(result); 
          }
        });
    });
  });
}

