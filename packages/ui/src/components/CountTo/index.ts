import { withInstall } from '~/_utils'
import _CountTo from './CountTo.vue'

export const CountTo = withInstall(_CountTo)
export default CountTo

export * from './CountTo.types'

declare module 'vue' {
  export interface GlobalComponents {
    CountTo: typeof CountTo
  }
}
