import type { App, AppContext, Component, Directive, Plugin } from 'vue'
import { NOOP } from '@vue/shared'
import { createApp } from 'vue'

export type SFCWithInstall<T> = T & Plugin
export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null
}

// 使用示例：
/**
export default withInstall<
  typeof Cascader & {
    SHOW_PARENT: typeof SHOW_PARENT;
    SHOW_CHILD: typeof SHOW_CHILD;
  }
>(
  Object.assign(Cascader, {
    SHOW_CHILD,
    SHOW_PARENT,
  } as any),
);
 */
// export const withInstall = <T>(comp: T) => {
//   const c = comp as any
//   c.install = function (app: App) {
//     app.component(c.displayName || c.name, comp as T & Plugin)
//   }

//   return comp as T & Plugin
// }

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  ;(main as SFCWithInstall<T>).install = (app: App): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp)
    }
  }

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      ;(main as any)[key] = comp
    }
  }
  return main as SFCWithInstall<T> & E
}

export const withInstallFunction = <T>(fn: T, name: string) => {
  ;(fn as SFCWithInstall<T>).install = (app: App) => {
    ;(fn as SFCInstallWithContext<T>)._context = app._context
    app.config.globalProperties[name] = fn
  }

  return fn as SFCInstallWithContext<T>
}

export const withInstallDirective = <T extends Directive>(directive: T, name: string) => {
  ;(directive as SFCWithInstall<T>).install = (app: App): void => {
    app.directive(name, directive)
  }

  return directive as SFCWithInstall<T>
}

export const withNoopInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = NOOP

  return component as SFCWithInstall<T>
}

/**
 * 挂载组件
 *
 * @param RootComponent 根组件
 * @returns 返回一个对象，包含实例和卸载方法
 * @template T 组件类型
 */
export function mountComponent<T>(RootComponent: Component) {
  const app = createApp(RootComponent)
  const root = document.createElement('div')

  document.body.appendChild(root)

  return {
    instance: app.mount(root) as T,
    unmount() {
      app.unmount()
      document.body.removeChild(root)
    },
  }
}
