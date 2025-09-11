import type { App } from 'vue'
import Button from './src/index.vue'

export * from './src/index.vue'

export const MButton = {
  install(app: App) {
    app.component(Button.name!, Button)
  },
}
export default MButton
