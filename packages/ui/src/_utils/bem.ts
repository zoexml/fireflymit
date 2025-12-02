/**
 * 创建命名空间 bem规范
 *
 * @param name 命名空间名称
 * @returns 返回由命名空间前缀和 bem 函数组成的元组
 */

// bem 规范 block 代码块 element 元素 modifier 装饰
// n-button n-button--primary n-button--disabled
const _bem = (
  prefix: string,
  blockSuffix: string,
  element: string,
  modifier: string,
) => {
  if (blockSuffix) {
    prefix += `-${blockSuffix}`
  }
  if (element) {
    prefix += `__${element}`
  }
  if (modifier) {
    prefix += `--${modifier}`
  }
  return prefix
}

const createBEM = (prefix: string = '') => {
  const b = (blockSuffix: string = '') => _bem(prefix, blockSuffix, '', '')

  const e = (element: string = '') =>
    element ? _bem(prefix, '', element, '') : ''

  const m = (modifier: string = '') =>
    modifier ? _bem(prefix, '', '', modifier) : ''

  const be = (blockSuffix: string = '', element: string = '') =>
    blockSuffix && element ? _bem(prefix, blockSuffix, element, '') : ''

  const em = (element: string = '', modifier: string = '') =>
    element && modifier ? _bem(prefix, '', element, modifier) : ''

  const bm = (blockSuffix: string = '', modifier: string = '') =>
    blockSuffix && modifier ? _bem(prefix, blockSuffix, '', modifier) : ''

  const bem = (
    blockSuffix: string = '',
    element: string = '',
    modifier: string = '',
  ) =>
    blockSuffix && element && modifier
      ? _bem(prefix, blockSuffix, element, modifier)
      : ''

  const is = (name: string, status: boolean) => (status ? `is-${name}` : '')

  return {
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
  }
}
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

  // return createBEM(prefixedName)
  return [prefixedName, bem]
}
