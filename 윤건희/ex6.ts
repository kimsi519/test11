export const randTime = <T>(val: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(promises: Promise<T>[]): Promise<Array<{ status: "fulfilled" | "rejected"; value?: T; reason?: any }>> {
  return Promise.all(promises.map(p =>
    p.then(
      (value): { status: "fulfilled"; value: T } => ({ status: "fulfilled", value }),
      (reason): { status: "rejected"; reason: any } => ({ status: "rejected", reason })
    )
  ));
}
