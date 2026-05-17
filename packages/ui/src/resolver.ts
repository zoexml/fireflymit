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
   * `@fireflymit/ui/dist/index.css` as the style side effect.
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

const components = [
  'Avatar',
  'Badge',
  'Banner',
  'CardBanner',
  'ContextMenu',
  'CountTo',
  'DragVerify',
  'ProForm',
  'SearchBar',
  'SvgIcon',
  'TextScroll',
] as const

const componentSet = new Set<string>(components)

export type FireflyMitComponentName = typeof components[number]

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
      sideEffects: importStyle ? `${packageName}/dist/index.css` : undefined,
    }
  }
}
