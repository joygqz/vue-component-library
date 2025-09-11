import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'unplugin-dts/vite'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      processor: 'vue',
      include: ['../../packages/**/*.{ts,tsx,vue}'],
      tsconfigPath: '../../tsconfig.packages.json',
      copyDtsFiles: true,
      insertTypesEntry: true,
      outDirs: [resolve(__dirname, '../../dist/es'), resolve(__dirname, '../../dist/lib')],
    }),
  ],
  build: {
    emptyOutDir: true,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, './index.ts'),
    },
    target: 'es2015',
    rollupOptions: {
      external: ['vue'],
      output: [
        {
          exports: 'named',
          format: 'es',
          entryFileNames: '[name].js',
          dir: resolve(__dirname, '../../dist/es'),
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, '../'),
        },
        {
          exports: 'named',
          format: 'cjs',
          entryFileNames: '[name].js',
          dir: resolve(__dirname, '../../dist/lib'),
          preserveModules: true,
          preserveModulesRoot: resolve(__dirname, '../'),
        },
      ],
    },
  },

})
