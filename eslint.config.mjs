// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    // allow console.log
    'no-console': 'off',
  },
})
