export const randTime = <T>(val: T): Promise<T> =>
    new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

// 각 promise 결과 타입 정의
type FulfilledResult<T> = { status: 'fulfilled'; value: T };
type RejectedResult = { status: 'rejected'; reason: String };

// promiseAllSettled 반환 결과 타입 정의
type PromiseAllSettledResult<T> = FulfilledResult<T> | RejectedResult;

export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<PromiseAllSettledResult<T>[]> {
    return new Promise((resolve) => {
        const results: PromiseAllSettledResult<T>[] = [];
        let completedCount = 0;

        promises.forEach((promise, index) => {
            promise
                .then((value) => {
                    results[index] = { status: 'fulfilled', value: value };
                })
                .catch((reason) => {
                    results[index] = { status: 'rejected', reason: reason };
                })
                .finally(() => {
                    completedCount += 1;
                    if (completedCount === promises.length) {
                        resolve(results);
                    }
                });
        });
    });
}