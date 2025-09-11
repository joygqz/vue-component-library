// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  type: 'lib',
  vue: true,
  ignores: [
    'docs/.vitepress/cache/**',
  ],
})
