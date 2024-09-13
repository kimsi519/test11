type AnyFunction = (...args: any[]) => any;

function debounce<T extends AnyFunction>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout | null = null;
	let lastArgs: Parameters<T> | null = null;

	return (...args: Parameters<T>) => {
		lastArgs = args;

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			if (lastArgs) {
				func(...lastArgs);
			}
		}, delay);
	};
}

function throttle<T extends AnyFunction>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let lastExec = 0;
	let timeoutId: NodeJS.Timeout | null = null;

	return (...args: Parameters<T>) => {
		const now = Date.now();

		if (now - lastExec >= delay) {
			func(...args);
			lastExec = now;
		} else if (!timeoutId) {
			timeoutId = setTimeout(() => {
				timeoutId = null;
			}, delay);
		}
	};
}

const debo = debounce((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) debo(i); // 15 출력

const thro = throttle((a: number) => console.log(a + 1), 500);
for (let i = 10; i < 15; i++) thro(i); // 11 출력
