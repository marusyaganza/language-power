module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: ['tests', 'node_modules'],
  setupFiles: ['./jestsetup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  coverageThreshold: {
    global: {
      branches: 80,
      lines: 80,
      functions: 80,
      statements: -50
    }
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|svg|webp|ttf|woff|woff2)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  }
};
