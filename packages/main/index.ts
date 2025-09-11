import Components from './component'
import { makeInstaller } from './make-installer'

export * from '@main/components'
export * from '@main/hooks'
export * from '@main/resolver'

export default makeInstaller([...Components])
