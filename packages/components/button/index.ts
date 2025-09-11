import Button from './src/index.vue'

export * from './src/index.vue'

export const MButton = {
  install(app) {
    app.component(Button.name, Button)
  },
}
export default MButton
