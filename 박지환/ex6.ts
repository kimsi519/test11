// randTime 함수 정의
export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

// promiseAllSettled 함수 정의
export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
  // 배열의 길이만큼의 비어 있는 배열을 생성
  const results: Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }> = new Array(promises.length);

  // 모든 Promise를 처리하고 결과를 results 배열에 저장
  return Promise.all(promises.map((promise, index) =>
    promise
      .then(value => { results[index] = { status: 'fulfilled', value }; })
      .catch(reason => { results[index] = { status: 'rejected', reason }; })
  )).then(() => results);
}

