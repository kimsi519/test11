Array.prototype.sortBy = function (sortProp = "") {
	let props = sortProp.split(",");
	props.reverse();

	// name | name:desc | name:asc
	for (let prop of props) {
		const [key, direction = "asc"] = prop?.split(":");
		const dir = direction.toLowerCase() === "desc" ? -1 : 1;
		this.sort((a, b) => (a[key] > b[key] ? dir : -dir));
	}

	return this;
};
