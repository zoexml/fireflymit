import { withInstall } from '~/_utils'
import _SvgIcon from './SvgIcon.vue'

export type { SvgIconProps } from './SvgIcon.vue'

export const SvgIcon = withInstall(_SvgIcon)
export default SvgIcon

declare module 'vue' {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon
  }
}
