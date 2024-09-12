export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));


export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<{ status: string, value?: T, reason?: any }[]> {
  return new Promise((resolve)=>{
    const results: { status: string, value?: T, reason?: any }[] = [];
    let completedPromises = 0;

    promises.forEach((promise, index)=>{
      promise
        .then((value)=>{
          results[index] = {status: 'fulfilled', value: value};
        })
        .catch((reason)=>{
          results[index] = {status: 'rejected', reason: reason};
        })
        .finally(()=>{
          completedPromises += 1;
  
          if(completedPromises == promises.length){
            resolve(results);
          }
        })
    })
  })
}

async function printPromise(){
  const a = await Promise.allSettled([randTime(1), randTime(2), randTime(3)]);
  const b = await promiseAllSettled([randTime(1), randTime(2), randTime(3)]);
  console.log(a);
  console.log("--------------------------------");
  console.log(b);
}

printPromise();