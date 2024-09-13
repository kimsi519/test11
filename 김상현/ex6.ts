export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));


export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<{ status: string, value?: T, reason?: any }[]> {
  return new Promise((resolve)=>{
    const results: { status: string, value?: T, reason?: any }[] = [];
    let completedPromises = 0;

    promises.forEach((promise, idx)=>{ // 프로미스를 돌면서
      promise
        .then((value)=>{ // 성공했으면
          results[idx] = {status: 'fulfilled', value: value};
        })
        .catch((reason)=>{ // 실패했으면
          results[idx] = {status: 'rejected', reason: reason};
        })
        .finally(()=>{ // 마지막엔
          completedPromises += 1;
  
          if(completedPromises == promises.length){ // 다 완료되었으면
            resolve(results);
          }
        })
    })
  })
}