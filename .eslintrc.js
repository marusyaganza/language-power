module.exports = {
  env: {
    es6: true,
    browser: true
  },
  extends: [
    'airbnb',
    'plugin:jest/recommended',
    'jest-enzyme',
    'plugin:sonarjs/recommended'
  ],
  plugins: ['babel', 'import', 'jsx-a11y', 'react', 'prettier', 'sonarjs'],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    'implicit-arrow-linebreak': 'off',
    'linebreak-style': 'off',
    'import/prefer-default-export': 'off',
    '0-tabs': 'off',
    'arrow-parens': 'off',
    'object-curly-newline': 'off',
    'no-mixed-operators': 'off',
    'arrow-body-style': 'off',
    'function-paren-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-plusplus': 'off',
    'space-before-function-paren': 0,
    'operator-linebreak': 'off',

    'max-len': ['warn', 100, 2, { ignoreUrls: true, ignoreStrings: true , ignoreComments: true}],
    'no-console': 'error',
    'no-alert': 'error',

    'no-param-reassign': 'off',
    'radix': 'off',
    'no-tabs': 'off',
    'comma-dangle': 'off',

    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js'] }],
    'react/no-did-mount-set-state': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/button-has-type': 'warn',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-autofocus': 'off',
    'jsx-a11y/anchor-is-valid': [
      'error',
      { components: ['Link'], specialLink: ['to'] }
    ],
    'jsx-a11y/label-has-for': [
      2,
      {
        required: {
          every: ['id']
        }
      }
    ],

    'prettier/prettier': ['error']
  }
};
