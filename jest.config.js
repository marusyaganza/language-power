module.exports = {
    verbose: true,
    collectCoverage: true,
    setupFiles: ['./jestsetup.js'],
    transform: {
      '^.+\\.js$': 'babel-jest',
      '.+\\.(css|styl|less|sass|scss)$': 'jest-transform-css',
      '^.+\\.svg$': 'jest-svg-transformer'
    },
    collectCoverageFrom: ['src/components/**/*.{js,jsx}']
  };