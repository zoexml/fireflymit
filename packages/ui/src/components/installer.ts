/*
 * @Description: 组件安装器
 */
import type { App, Component } from 'vue'

const componentModules = import.meta.glob('./*/index.ts', {
  eager: true,
}) as Record<string, { default: Component }>

const components = Object.values(componentModules)
  .map(module => module.default)
  .filter((component): component is Component & { name: string } => Boolean(component.name))

export function installer(app: App) {
  // const componentNames = components.map(component => component.name)
  // console.info('[@fireflymit/ui] registering components:', componentNames)

  components.forEach(component => app.component(component.name, component))
}
