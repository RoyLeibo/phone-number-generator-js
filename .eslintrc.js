module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-non-null-assertion': 'warn',
  },
}
