module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  plugins: ['import', 'simple-import-sort'],
  rules: {
    'import/no-duplicates': 'warn',
    'simple-import-sort/imports': 'warn',
    'simple-import-sort/exports': 'warn',
  },
  ignorePatterns: ['.vercel', '.eslintrc.cjs', '**/node_modules/**'],
};
