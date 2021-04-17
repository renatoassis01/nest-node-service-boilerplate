module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    './.eslint-ts-naming-convention-seidor.js',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js', '.eslint-ts-naming-convention-seidor.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'max-classes-per-file': ['error', 1],
  },
  overrides: [
    {
      files: ['*.spec.ts'],
      rules: {
        'max-classes-per-file': 'off',
      },
    },
    {
      files: ['**/migrations/*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
      },
    },
  ],
};
