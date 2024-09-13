// 프로미스 상태 나타내는 타입 정의
type SettledResult<T> = 
  | { status: 'fulfilled'; value: T }  // 성공 시
  | { status: 'rejected'; reason: any };  // 실패 시

// 랜덤시간 후 반환
export const randTime = function <T>(val: T): Promise<T> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve(val);  // 반환
    }, Math.random() * 1000);  // 랜덤 시간 후에 실행
  });
};

// 성공/실패 상태를 반환하는 함수
export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<SettledResult<T>[]> {
  return new Promise(function (resolve) {
    const results: SettledResult<T>[] = new Array(promises.length);  // 결과를 저장 배열 
    let completed = 0;  // 성공 promise 개수
    
    promises.forEach(function (promise, index) {
      promise
        .then(function (value) {
          results[index] = { status: 'fulfilled', value: value };  // 성공 시 결과 저장
        })
        .catch(function (reason) {
          results[index] = { status: 'rejected', reason: reason };  // 실패 시 결과 저장
        })
        .finally(function () {
          completed++; 
          if (completed === promises.length) {  //모든 promise 완료
            resolve(results);  
          }
        });
    });
  });
}
