// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    testMatch: ["**/tests/**/**/*.spec.js"],
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "json", "vue"],
};

