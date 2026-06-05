/**
 * 创建命名空间 bem规范
 *
 * @param name 命名空间名称
 * @returns 返回由命名空间前缀和 bem 函数组成的元组
 *
 */

export function createNamespace(name: string): [string, (...mods: string[]) => string] {
  const prefixedName = `ffm-${name}`

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

  return [prefixedName, bem]
}
