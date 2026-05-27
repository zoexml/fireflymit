/**
 * 手机号脱敏
 *
 * @param mobile 手机号码
 * @returns 返回隐藏中间四位后的手机号码
 * @example
 * ```ts
 * hideMobile(12345678901) // 123****8901
 * ```
 */
export const hideMobile = (mobile: string) => {
  return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
}

/**
 * 将文本复制到剪贴板
 *
 * @param text 要复制的文本
 */
export const copyToClipboard = (text: string) => {
  return navigator.clipboard.writeText(text)
}

/**
 * 生成随机颜色值
 *
 * @returns 返回一个以 `#` 开头的六位十六进制颜色值字符串
 */
export function randomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`
}

/**
 * 解析URL查询参数
 *
 * @param url 待解析的URL
 * @returns 返回解析后的查询参数对象，以键值对形式表示
 * @example
 * ```ts
 * parseQuery('https://www.baidu.com/?a=1&b=2') // { a: '1', b: '2' }
 *
 * parseQuery('a=1&b=2&c=3') // { a: '1', b: '2', c: '3' }
 * ```
 */
export const parseQuery = (url: string) => {
  const q: Record<string, string> = {}
  url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (q[k] = decodeURIComponent(v)))
  return q
}
