module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'vue/multiline-html-element-content-newline': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': ['warn', {
      'singleline': {
        'max': 4
      },
      'multiline': {
        'max': 1
      }
    }],
    'quotes': ['warn', 'single']
  }
}
