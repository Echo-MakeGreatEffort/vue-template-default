module.exports = {
    env: {
        es6: true,
        node: true,
        browser: true
    },
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended' // 搭配 eslint-config-prettier 关闭 ESLint 与 Prettier 的冲突
    ],
    parserOptions: {
        ecmaVersion: 2018,
        parser: require.resolve('babel-eslint'),
        sourceType: 'module'
    },
    plugins: [],
    ignorePatterns: ['.prettierrc.js', '.stylelintrc.js'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
    }
};
