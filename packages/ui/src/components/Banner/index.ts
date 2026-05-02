import { withInstall } from '~/_utils'
import _Banner from './Banner.vue'

export type { BannerButtonConfig, BannerImageConfig, BannerMeteorConfig, BannerProps } from './Banner.types'

export const Banner = withInstall(_Banner)
export default Banner

declare module 'vue' {
  export interface GlobalComponents {
    Banner: typeof Banner
  }
}
