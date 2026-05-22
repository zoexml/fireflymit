import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DialogForm from './DialogForm.vue'

const meta: Meta<typeof DialogForm> = {
  title: 'UI/DialogForm',
  component: DialogForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DialogForm>

const sleep = (time = 800) => new Promise(resolve => setTimeout(resolve, time))

export const Basic: Story = {
  render: () => ({
    components: { DialogForm },
    setup() {
      const visible = ref(false)
      const form = ref<Record<string, any>>({
        name: '',
        role: undefined,
        status: true,
      })
      const result = ref('')
      const items = [
        { label: '名称', key: 'name', type: 'input', props: { placeholder: '请输入名称', clearable: true } },
        {
          label: '角色',
          key: 'role',
          type: 'select',
          props: {
            clearable: true,
            options: [
              { label: '管理员', value: 'admin' },
              { label: '运营', value: 'operator' },
            ],
            placeholder: '请选择角色',
          },
        },
        { label: '启用', key: 'status', type: 'switch' },
      ]
      const submit = async (values: Record<string, any>) => {
        await sleep()
        result.value = JSON.stringify(values, null, 2)
      }

      return { visible, form, items, result, submit }
    },
    template: `
      <button style="padding: 6px 16px;" @click="visible = true">打开弹窗表单</button>
      <DialogForm v-model="visible" v-model:form="form" title="新增用户" :items="items" :submit="submit" />
      <pre style="margin-top: 16px;">{{ result || '暂无提交数据' }}</pre>
    `,
  }),
}
