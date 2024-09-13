function deepCopy(obj) {
	if (obj === null || typeof obj !== "object") {
		return obj;
	}

	if (obj instanceof Date) {
		return new Date(obj);
	}

	if (obj instanceof RegExp) {
		return new RegExp(obj);
	}

	if (obj instanceof Set) {
		const newSet = new Set();
		for (const item of obj) {
			newSet.add(deepCopy(item));
		}
		return newSet;
	}

	if (obj instanceof Map) {
		const newMap = new Map();
		for (const [key, value] of obj) {
			newMap.set(deepCopy(key), deepCopy(value));
		}
		return newMap;
	}

	if (obj instanceof WeakSet || obj instanceof WeakMap) {
		// WeakSet과 WeakMap은 깊은 복사가 불가능하므로 새 인스턴스를 반환
		return new obj.constructor();
	}

	if (Array.isArray(obj)) {
		return obj.map((item) => deepCopy(item));
	}

	const newObj = {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			newObj[key] = deepCopy(obj[key]);
		}
	}

	// Symbol 키 처리
	const symbolKeys = Object.getOwnPropertySymbols(obj);
	for (const symKey of symbolKeys) {
		newObj[symKey] = deepCopy(obj[symKey]);
	}

	return newObj;
}

module.exports = { deepCopy };
