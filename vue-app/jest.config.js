// jest.config.js
module.exports = {
	testMatch: ["**/tests/**/**/*.spec.js"],
	collectCoverageFrom: [
		"**/*.{js,vue}",
		"!**/node_modules/**",
		"!**/vendor/**",
	],
};
