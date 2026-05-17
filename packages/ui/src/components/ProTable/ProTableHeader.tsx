import type { PropType } from 'vue'
import type { ProTableColumn } from './ProTable.types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProTableHeader',
  props: {
    column: {
      type: Object as PropType<ProTableColumn>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    return () => {
      if (props.column.headerRender) {
        return props.column.headerRender({
          column: props.column,
          $index: props.index,
        })
      }

      return props.column.label ?? ''
    }
  },
})
