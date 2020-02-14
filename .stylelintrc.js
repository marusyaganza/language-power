module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-airbnb',
    'stylelint-prettier/recommended',
      'stylelint-config-idiomatic-order'
  ],
  plugins: ['stylelint-a11y', "stylelint-order", 'stylelint-high-performance-animation', 'stylelint-prettier', 'stylelint-no-indistinguishable-colors'],
  rules: {
    indentation: [4, { ignore: ['inside-parens'] }],
    'number-leading-zero': 'always',
    'string-quotes': 'single',
      'prettier/prettier': [true, {"singleQuote": true, "tabWidth": 4}]  },
    'order/order': [
			"custom-properties",
			"declarations"
		]
  };