import {
  defineConfig,
  presetUno,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  preflights: [],
  presets: [
    presetUno(),
  ],
  transformers: [
    transformerVariantGroup(),
  ],
})
