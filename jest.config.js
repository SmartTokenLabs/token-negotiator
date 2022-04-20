module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": '<rootDir>/test/jest/jest.transform.js'
  },
  setupFilesAfterEnv: ['<rootDir>/test/jest/jest.setup.js'],
  reporters: ['default', 'jest-junit'],
  roots: ['<rootDir>/src'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  verbose: true,
  testTimeout: 300000,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    '!src/vendor/**'
  ],
  coverageDirectory: '<rootDir>/reports/coverage/',
  coverageThreshold: {
    global: {
      lines: 26
    }
  },
  testPathIgnorePatterns: [
    "dist"
  ],
  testEnvironment: 'jsdom',
  "globals": {
    "window": {},
    "localStorage": {}
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/test/jest/__mocks__/mock.js'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@toruslabs/torus-embed)/']
};
