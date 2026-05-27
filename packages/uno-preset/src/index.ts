// @unocss-include

import type { Preset } from 'unocss'

export function presetFireflymit(): Preset {
  return {
    name: 'preset-fireflymit',
    theme: {
      colors: {
        brand: {
          primary: '#409eff',
          success: '#67c23a',
          warning: '#e6a23c',
          danger: '#f56c6c',
          info: '#909399',
        },
        text: {
          primary: '#303133',
          regular: '#606266',
          secondary: '#909399',
          placeholder: '#a8abb2',
          disabled: '#c0c4cc',
        },
        border: {
          base: '#dcdfe6',
          light: '#e4e7ed',
          lighter: '#ebeef5',
          extraLight: '#f2f6fc',
        },
        bg: {
          base: '#ffffff',
          page: '#f2f3f5',
          overlay: '#ffffff',
        },
      },
    },
    rules: [
      [
        /^(?:p[tblr]|padding-(?:top|bottom|left|right))-safe$/,
        (match: RegExpMatchArray) => {
          const [m] = match
          const propMap: Record<string, string> = {
            'pt-safe': 'padding-top',
            'pb-safe': 'padding-bottom',
            'pl-safe': 'padding-left',
            'pr-safe': 'padding-right',
            'padding-top-safe': 'padding-top',
            'padding-bottom-safe': 'padding-bottom',
            'padding-left-safe': 'padding-left',
            'padding-right-safe': 'padding-right',
          }
          const envProp = m.startsWith('pt') || m === 'padding-top-safe'
            ? 'safe-area-inset-top'
            : m.startsWith('pb') || m === 'padding-bottom-safe'
              ? 'safe-area-inset-bottom'
              : m.startsWith('pl') || m === 'padding-left-safe'
                ? 'safe-area-inset-left'
                : 'safe-area-inset-right'

          return { [propMap[m] as string]: `env(${envProp}, 0px)` }
        },
      ],
      [/^aspect-(\d+)\/(\d+)$/, (match: RegExpMatchArray) => ({
        'aspect-ratio': `${match[1]}/${match[2]}`,
      })],
    ],
    shortcuts: [
      {
        'flex-center': 'flex justify-center items-center',
        'flex-x-center': 'flex justify-center',
        'flex-y-center': 'flex items-center',
        'flex-col': 'flex flex-col',
        'flex-col-center': 'flex-center flex-col',
        'flex-col-stretch': 'flex-col items-stretch',
        'i-flex-center': 'inline-flex justify-center items-center',
        'i-flex-x-center': 'inline-flex justify-center',
        'i-flex-y-center': 'inline-flex items-center',
        'i-flex-col': 'flex-col inline-flex',
        'i-flex-col-center': 'flex-col i-flex-center',
        'i-flex-col-stretch': 'i-flex-col items-stretch',
        'flex-1-hidden': 'flex-1 overflow-hidden',
      },
      {
        'absolute-lt': 'absolute left-0 top-0',
        'absolute-lb': 'absolute left-0 bottom-0',
        'absolute-rt': 'absolute right-0 top-0',
        'absolute-rb': 'absolute right-0 bottom-0',
        'absolute-tl': 'absolute-lt',
        'absolute-tr': 'absolute-rt',
        'absolute-bl': 'absolute-lb',
        'absolute-br': 'absolute-rb',
        'absolute-center': 'absolute-lt flex-center size-full',
        'fixed-lt': 'fixed left-0 top-0',
        'fixed-lb': 'fixed left-0 bottom-0',
        'fixed-rt': 'fixed right-0 top-0',
        'fixed-rb': 'fixed right-0 bottom-0',
        'fixed-tl': 'fixed-lt',
        'fixed-tr': 'fixed-rt',
        'fixed-bl': 'fixed-lb',
        'fixed-br': 'fixed-rb',
        'fixed-center': 'fixed-lt flex-center size-full',
      },
      {
        'nowrap-hidden': 'overflow-hidden whitespace-nowrap',
        'ellipsis-text': 'nowrap-hidden text-ellipsis',
      },
    ],
  }
}

export default presetFireflymit
