// import type { ButtonType } from '../components/Button'
// import { mount } from '@vue/test-utils'
import { bench, describe } from 'vitest'
// import Button from '../components/Button/Button.vue'

describe('button Performance', () => {
  bench('button mount', () => {
    // mount(Button, {
    //   slots: {
    //     default: 'Test Button',
    //   },
    // })
  })

  bench('button with props mount', () => {
    // mount(Button, {
    //   props: {
    //     type: 'primary',
    //     size: 'large',
    //     disabled: false,
    //     round: true,
    //   },
    //   slots: {
    //     default: 'Test Button',
    //   },
    // })
  })

  bench('multiple Button mounts', () => {
    for (let i = 0; i < 100; i++) {
      // mount(Button, {
      //   props: {
      //     type: i % 2 === 0 ? 'primary' : ('default' as ButtonType),
      //   },
      //   slots: {
      //     default: `Button ${i}`,
      //   },
      // })
    }
  })
})
