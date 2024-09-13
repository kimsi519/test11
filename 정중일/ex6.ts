export const randTime = <T>(val: T): Promise<T> =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

export function promiseAllSettled<T>(promises: Promise<T>[]) {
  return promiseAll(
    promises.map((p) =>
      p
        .then((r): ResponseType<T> => ({ status: "fulfilled", value: r }))
        .catch(
          (e): ResponseType<T> => ({
            status: "rejected",
            reason: e,
          })
        )
    )
  );
}

function promiseAll<T>(promises: Promise<ResponseType<T>>[]) {
  return new Promise((resolve, reject) => {
    let queue = new Array<ResponseType<T>>(promises.length);
    let count = 0;
    promises.forEach((p, i) => {
      p.then((r) => {
        queue[i] = r;
        count++;
        if (count === promises.length) {
          resolve(queue);
        }
      }).catch((e) => {
        reject(e);
      });
    });
  });
}

type ResponseType<T> = {
  status: "fulfilled" | "rejected";
  value?: T;
  reason?: string;
};
