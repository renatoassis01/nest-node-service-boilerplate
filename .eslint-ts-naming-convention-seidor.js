module.exports = {
  rules: {
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'variable',
        types: ['boolean'],
        format: ['camelCase', 'PascalCase'],
        prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
      },
      {
        selector: ['variable', 'function'],
        format: ['camelCase'],
      },
      {
        selector: 'variable',
        modifiers: ['const'],
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'class',
        format: ['PascalCase'],
        suffix: [
          'Module',
          'Middleware',
          'Guard',
          'Interceptor',
          'Exception',
          'Pipe',
          'Builder',
          'RequestDTO',
          'ResponseDTO',
          'ValidatorDTO',
          'Utils',
          'Config',
          'Controller',
          'Repository',
          'Service',
          'ExternalServices',
          'Model',
        ],
      },
      {
        selector: 'enum',
        format: ['PascalCase'],
        suffix: ['Enum'],
      },
    ],
  },
};
