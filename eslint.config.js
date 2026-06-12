import antfu from '@antfu/eslint-config'

export default antfu({
  vue: true,
  typescript: true,
  formatters: {
    css: true,
    html: true,
  },
  rules: {
    'no-console': 'warn',
    'vue/max-attributes-per-line': ['error', { singleline: 3, multiline: 1 }],
  },
})
