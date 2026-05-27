import type { FireflyMitComponentName } from './components/names'
import { componentNames } from './components/names'

export type { FireflyMitComponentName }

export interface FireflyMitResolverOptions {
  /**
   * Component prefix used in templates or auto-import identifiers.
   *
   * @example 'F' resolves `FBadge` to `Badge`.
   */
  prefix?: string
  /**
   * Import library styles together with resolved components.
   *
   * The current build emits one bundled stylesheet, so this imports
   * `@fireflymit/ui/style.css` as the style side effect.
   *
   * @default true
   */
  importStyle?: boolean | 'css'
  /**
   * Override package name for aliases, forks, or local testing.
   *
   * @default '@fireflymit/ui'
   */
  packageName?: string
}

export interface FireflyMitResolveResult {
  name: string
  from: string
  sideEffects?: string
}

const componentSet = new Set<string>(componentNames)

export const FireflyMitResolver = (options: FireflyMitResolverOptions = {}) => {
  const {
    prefix = '',
    importStyle = true,
    packageName = '@fireflymit/ui',
  } = options

  return (name: string): FireflyMitResolveResult | undefined => {
    if (prefix && !name.startsWith(prefix)) return undefined

    const componentName = prefix ? name.slice(prefix.length) : name

    if (!componentSet.has(componentName)) return undefined

    return {
      name: 'default',
      from: `${packageName}/es/components/${componentName}`,
      sideEffects: importStyle ? `${packageName}/style.css` : undefined,
    }
  }
}
