/**
 * 将字符串的首字母转换为大写
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * 将驼峰命名转换为短横线命名
 */
export const camelToKebab = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}

/**
 * 判断是否为字符串
 */
export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

/**
 * 生成指定长度的随机字符串
 *
 * @param length 字符串长度
 * @returns 返回随机字符串
 */
export const randomString = (length: number): string => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

// test
// console.log('🚀 ~ randomString(10) :', randomString(10)) // iZCKb4ZBcf
