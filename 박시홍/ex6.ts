// export const randTime = <T>(val: T): Promise<T> =>
//   new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

// export function promiseAllSettled<T>(promises: Promise<T>[]) {}
// export const randTime = <T>(val: T): Promise<T> =>
//     new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));
  
//   export function promiseAllSettled<T>(promises: Promise<T>[]) {}

// ex6.ts
// Helper function to mimic Promise.all
export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];
    let remaining = promises.length;
    
    if (remaining === 0) {
      resolve(results);
      return;
    }
    
    promises.forEach((promise, index) => {
      promise
        .then(result => {
          results[index] = result;
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        })
        .catch(err => reject(err));
    });
  });
}

// Function to mimic Promise.allSettled
export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
  return new Promise((resolve) => {
    const results: Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }> = [];
    let remaining = promises.length;
    
    if (remaining === 0) {
      resolve(results);
      return;
    }
    
    promises.forEach((promise, index) => {
      promise
        .then(value => {
          results[index] = { status: 'fulfilled', value };
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        })
        .catch(reason => {
          results[index] = { status: 'rejected', reason };
          remaining--;
          if (remaining === 0) {
            resolve(results);
          }
        });
    });
  });
}

// Example usage
export const randTime = <T>(val: T): Promise<T> =>
    new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));
