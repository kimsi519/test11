export const randTime = <T>(val: T): Promise<T> =>
    new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }>> {
    // 모든 프로미스의 결과를 담을 배열
    const results: Array<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }> = [];
    
    // 모든 프로미스의 상태를 추적
    const wrappedPromises = promises.map(promise =>
        promise
            .then(value => ({ status: 'fulfilled', value } as { status: 'fulfilled'; value: T }))
            .catch(reason => ({ status: 'rejected', reason } as { status: 'rejected'; reason: any }))
    );

    // 모든 프로미스가 처리될 때까지 기다리고 결과를 반환
    return Promise.all(wrappedPromises);
}