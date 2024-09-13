Array.prototype.sortBy = function (sortProp = "") {
	if (!sortProp) return this;

	const sortProps = sortProp.split(",").map((prop) => {
		const [key, order = "asc"] = prop.trim().split(":");
		return { key, order };
	});

	return this.slice().sort((a, b) => {
		for (const { key, order } of sortProps) {
			if (a[key] < b[key]) return order === "asc" ? -1 : 1;
			if (a[key] > b[key]) return order === "asc" ? 1 : -1;
		}
		return 0;
	});
};
