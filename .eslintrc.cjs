/* eslint-env node */

module.exports = {
  root: true,
  ignorePatterns: ['node_modules/*'],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  plugins: [
    '@typescript-eslint',
    'vue', // 确保包含Vue插件
  ],
  extends: [
    'plugin:@typescript-eslint/recommended', // TypeScript推荐规则
    'plugin:vue/vue3-recommended', // Vue 3的推荐规则
    'eslint:recommended', // ESLint推荐规则
    'plugin:prettier/recommended', // 启用并作为ESLint错误显示Prettier错误
    '@vue/prettier', // Vue + Prettier集成
    '@vue/typescript/recommended', // Vue的TypeScript规则
  ],
  rules: {
    // 自定义规则覆盖
    'vue/html-closing-bracket-newline': 'off', // 禁用Vue单行元素内容换行规则，避免与Prettier冲突
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
    // 根据需要添加更多自定义规则
    // ...
  },
  settings: {
    'import/resolver': {
      typescript: {}, // 如果你使用 TypeScript，确保这个选项被正确配置
    },
  },
  globals: {
    // 假设你使用了 Ant Design Vue 的多个组件，可以在这里定义它们
    ATable: 'readonly', // 告诉 ESLint ATable 是一个全局变量
  },
};