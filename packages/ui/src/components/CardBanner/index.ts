import { withInstall } from '~/_utils'
import _CardBanner from './CardBanner.vue'

export type { CardBannerButtonConfig, CardBannerProps } from './CardBanner.types'

export const CardBanner = withInstall(_CardBanner)
export default CardBanner

declare module 'vue' {
  export interface GlobalComponents {
    CardBanner: typeof CardBanner
  }
}
