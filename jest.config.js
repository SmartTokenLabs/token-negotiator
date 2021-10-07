module.exports = {
  reporters: ['default', 'jest-junit'],
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  testTimeout: 300000,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/reports/coverage/',
  testPathIgnorePatterns: ['dist'],
  "globals": {
    "window": {},
    "localStorage": {}
  }
};
