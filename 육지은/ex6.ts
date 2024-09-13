export const randTime = <T>(val: T): Promise<T> =>
    new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));


// Promise.allSettled
export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<{ status: 'fulfilled' | 'rejected'; value?: T; reason?: any }[]> {
    return new Promise(resolve => {
        const results: { status: 'fulfilled' | 'rejected'; value?: T; reason?: any }[] = [];
        let ok = 0;

        for (let i = 0; i < promises.length; i++) {
            promises[i]
            .then(value => {
                results[i] = { status: 'fulfilled', value };
            })
            .catch(reason => {
                results[i] = { status: 'rejected', reason };
            })
            .finally(() => {
                ok++;
                if (ok === promises.length) {
                    resolve(results);
                }
            });
        }
    });
}