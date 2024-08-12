// jest.config.js
module.exports = {
    testMatch: ["**/tests/**/**/*.spec.js"],
    transform: {
        "^.+\\.vue$": "vue-jest",
        "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
    },
    moduleFileExtensions: ["js", "jsx", "json", "vue"],
};
