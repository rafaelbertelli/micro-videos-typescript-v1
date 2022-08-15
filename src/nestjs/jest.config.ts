export default {
  displayName: {
    name: 'nestjs',
    color: 'magenta',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  clearMocks: true,
  coverageProvider: 'v8',
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
  verbose: false,

  moduleNameMapper: {
    'mvt-core/(.*)$': '<rootDir>/../../../node_modules/mvt-core/dist/$1',
    '#seedwork/domain':
      '<rootDir>/../../../node_modules/mvt-core/dist/@seedwork/domain/index.js',
    '#seedwork/(.*)$':
      '<rootDir>/../../../node_modules/mvt-core/dist/@seedwork/$1',
    '#category/domain':
      '<rootDir>/../../../node_modules/mvt-core/dist/category/domain/index.js',
    '#category/(.*)$':
      '<rootDir>/../../../node_modules/mvt-core/dist/category/$1',
  },
  // setupFilesAfterEnv: ['../../@core/src/@seedwork/domain/tests/jest.ts'],
};
