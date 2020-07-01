module.exports = {
  verbose: true,
  coveragePathIgnorePatterns: ['tests', 'node_modules'],
  setupFiles: ['./jestsetup.js'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.svg$': 'jest-svg-transformer'
  },
  coverageThreshold: {
    global: {
      branches: 80,
      lines: 80,
      functions: 80,
      statements: -30
    }
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|webp|ttf|woff|woff2)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': 'identity-obj-proxy'
  }
};
