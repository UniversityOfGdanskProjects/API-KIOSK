module.exports = {
    env: {
        es2021: true,
        node: true,
        jest: true,
    },
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescipt-eslint/recommended',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended',
    ],
    parseOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    rules: {},
};
