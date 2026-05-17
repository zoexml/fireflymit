import type { PropType } from 'vue'
import type { ProTableColumn } from './ProTable.types'
import { defineComponent } from 'vue'
import { getRowValue } from './ProTable.utils'

export default defineComponent({
  name: 'ProTableCell',
  props: {
    row: {
      type: Object as PropType<Record<string, any>>,
      required: true,
    },
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
      const value = getRowValue(props.row, props.column.prop)
      const scope = {
        row: props.row,
        column: props.column,
        value,
        $index: props.index,
      }

      if (props.column.render) {
        return props.column.render(scope)
      }

      if (props.column.formatter) {
        return props.column.formatter(props.row, props.column, value, props.index)
      }

      return value == null ? '' : String(value)
    }
  },
})
