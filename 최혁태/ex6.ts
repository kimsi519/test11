export const randTime = <T>(val: T): Promise<T> =>
	new Promise((resolve) => setTimeout(resolve, Math.random() * 1000, val));

type PromiseSettledResult<T> =
	| { status: "fulfilled"; value: T }
	| { status: "rejected"; reason: any };

export function promiseAllSettled<T>(
	promises: Promise<T>[]
): Promise<PromiseSettledResult<T>[]> {
	return Promise.all(
		promises.map((promise) =>
			promise
				.then((value) => ({ status: "fulfilled" as const, value }))
				.catch((reason) => ({ status: "rejected" as const, reason }))
		)
	);
}
