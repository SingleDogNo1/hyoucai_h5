module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/require-prop-type-constructor': 0,
    'no-undef': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
