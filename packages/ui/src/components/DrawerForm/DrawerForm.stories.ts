import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DrawerForm from './DrawerForm.vue'

const meta: Meta<typeof DrawerForm> = {
  title: 'UI/DrawerForm',
  component: DrawerForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DrawerForm>

const sleep = (time = 800) => new Promise(resolve => setTimeout(resolve, time))

export const Basic: Story = {
  render: () => ({
    components: { DrawerForm },
    setup() {
      const visible = ref(false)
      const form = ref<Record<string, any>>({
        name: '北区项目',
        owner: '',
        status: true,
      })
      const result = ref('')
      const items = [
        { label: '项目名称', key: 'name', type: 'input', props: { placeholder: '请输入项目名称', clearable: true } },
        { label: '负责人', key: 'owner', type: 'input', props: { placeholder: '请输入负责人', clearable: true } },
        { label: '启用', key: 'status', type: 'switch' },
      ]
      const submit = async (values: Record<string, any>) => {
        await sleep()
        result.value = JSON.stringify(values, null, 2)
      }

      return { visible, form, items, result, submit }
    },
    template: `
      <button style="padding: 6px 16px;" @click="visible = true">打开抽屉表单</button>
      <DrawerForm v-model="visible" v-model:form="form" title="编辑项目" :items="items" :submit="submit" />
      <pre style="margin-top: 16px;">{{ result || '暂无提交数据' }}</pre>
    `,
  }),
}
