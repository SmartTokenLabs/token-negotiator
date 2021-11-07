module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  reporters: ['default', 'jest-junit'],
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  testTimeout: 300000,
  collectCoverage: true,
  coverageDirectory: '<rootDir>/reports/coverage/',
  testPathIgnorePatterns: ['dist'],
  testEnvironment: 'jsdom',
  "globals": {
    "window": {},
    "localStorage": {}
  }
};
