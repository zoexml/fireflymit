/**
 * 创建命名空间 bem规范
 *
 * @param name 命名空间名称
 * @returns 返回由命名空间前缀和 bem 函数组成的元组
 */
export function createNamespace(name: string): [string, (...mods: string[]) => string] {
  const prefixedName = `art-${name}`

  const bem = (...mods: string[]) => {
    const classNames: string[] = []
    if (mods) {
      mods.forEach((mod) => {
        if (mod) {
          if (mod.startsWith('__')) {
            return classNames.push(`${prefixedName}${mod}`)
          } else {
            return classNames.push(`${prefixedName}--${mod}`)
          }
        }
      })
    }
    return classNames.join(' ')
  }

  // 使用 bem 函数生成类名
  // const blockClass = bem() // 'art-button'
  // const elementClass = bem('text') // 'art-button--text'
  // const modifierClass = bem('__active') // 'art-button__active'
  // 可以这样使用生成的类名
  // const elementWithModifier = bem('text', '__active') // 'art-button--yh-text art-button__active'
  return [prefixedName, bem]
}
