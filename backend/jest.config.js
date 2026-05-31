export default {
  testEnvironment: 'node',
  collectCoverageFrom: [
    'controllers/**/*.js',
    'services/**/*.js',
    'middleware/**/*.js',
    'routes/**/*.js',
    '!**/*.test.js',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  testMatch: ['**/__tests__/**/*.test.js'],
  verbose: true,
};
