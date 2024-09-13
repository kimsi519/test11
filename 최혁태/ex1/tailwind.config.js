/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js}"],
	theme: {
		extend: {
			colors: {
				"toss-blue": "#3182f6",
				"toss-gray": "#f9fafb",
			},
			fontFamily: {
				sans: ["Pretendard", "Arial", "sans-serif"],
			},
		},
	},
	plugins: [],
};
