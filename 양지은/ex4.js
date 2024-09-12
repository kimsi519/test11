function deepCopy(obj) {
	if (typeof obj !== "object" || obj === null) {
		return obj;
	}

	// 배열인 경우 깊은 복사 처리
	if (Array.isArray(obj)) {
		return obj.map((item) => deepCopy(item));
	}

	// Set인 경우 깊은 복사 처리
	if (obj instanceof Set) {
		const copy = new Set();
		obj.forEach((item) => {
			copy.add(deepCopy(item));
		});
		return copy;
	}

	// Map인 경우 깊은 복사 처리
	if (obj instanceof Map) {
		const copy = new Map();
		obj.forEach((value, key) => {
			copy.set(deepCopy(key), deepCopy(value));
		});
		return copy;
	}

	// WeakSet이랑 WeakMap은 깊은 복사 안 된다.
	if (obj instanceof WeakSet) {
		return obj;
	}

	if (obj instanceof WeakMap) {
		return obj;
	}

	if (obj instanceof Function) {
		return obj;
	}

	if (typeof obj === "symbol") {
		return Symbol(obj.description);
	}

	const copy = {};

	for (let a in obj) {
		if (obj.hasOwnProperty(a)) {
			// hasOwnProperty : 객체가 특정 property를 가지고 있으면 true 반환
			copy[a] = deepCopy(obj[a]);
		}
	}

	// obj의 모든 Symbol Properties를 배열로 반환
	// Symbol 깊은 복사 처리
	for (let key of Object.getOwnPropertySymbols(obj)) {
		copy[key] = deepCopy(obj[key]);
	}

	return copy;
}

module.exports = { deepCopy };
