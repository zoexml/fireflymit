import { presetFireflymit } from '@fireflymit/uno-preset'
import {
  defineConfig,
  presetWind3,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  preflights: [],
  presets: [
    presetWind3(),
    presetFireflymit(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
