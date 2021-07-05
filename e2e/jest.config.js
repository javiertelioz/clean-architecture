module.exports = {
  globalSetup: './setup.ts',
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  roots: ['<rootDir>'],
  testPathIgnorePatterns: ['node_modules'],
  verbose: true,
  coverageThreshold: {
    global: {
      lines: 100,
      branches: 100,
      functions: 100,
      statements: 100
    }
  },
};
