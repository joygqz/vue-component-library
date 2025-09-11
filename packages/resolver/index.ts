import { kebabCase } from 'es-toolkit/string'

export function MainResolver() {
  return (name: string) => {
    return kebabCase(name).startsWith('m-') ? `@main/components/${kebabCase(name).slice(2)}` : null
  }
}
