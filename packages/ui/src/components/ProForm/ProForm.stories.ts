import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { computed, ref } from 'vue'
import ProForm from './ProForm.vue'

const meta: Meta<typeof ProForm> = {
  title: 'UI/ProForm',
  component: ProForm,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ProForm>

export const Basic: Story = {
  render: () => ({
    components: { ProForm },
    setup() {
      const formRef = ref()
      const formData = ref<Record<string, any>>({
        name: undefined,
        phone: undefined,
        level: undefined,
        address: undefined,
        date: undefined,
        userGender: undefined,
        status: undefined,
        age: undefined,
      })
      const formResult = ref('')

      const formItems = computed(() => [
        { label: '用户名', key: 'name', type: 'input' as const, placeholder: '请输入用户名', clearable: true },
        { label: '手机号', key: 'phone', type: 'input', props: { placeholder: '请输入手机号', maxlength: 11, clearable: true } },
        { label: '用户等级', key: 'level', type: 'select', props: {
          placeholder: '请选择等级',
          options: [
            { label: '普通用户', value: 'normal' },
            { label: 'VIP用户', value: 'vip' },
            { label: '高级VIP', value: 'svip' },
          ],
          clearable: true,
        } },
        { label: '地址', key: 'address', type: 'input', placeholder: '请输入地址', clearable: true },
        { label: '日期', key: 'date', type: 'datetime', props: { style: { width: '100%' }, placeholder: '请选择日期', type: 'date', valueFormat: 'YYYY-MM-DD' } },
        { label: '性别', key: 'userGender', type: 'radiogroup', props: { options: [
          { label: '男', value: '1' },
          { label: '女', value: '2' },
        ] } },
        { label: '是否启用', key: 'status', type: 'switch' },
        { label: '年龄', key: 'age', type: 'number' },
      ])

      const handleFormReset = () => { formResult.value = '' }
      const handleFormSubmit = (params: Record<string, any>) => { formResult.value = JSON.stringify(params, null, 2) }
      const validateForm = () => formRef.value?.validate()
      const resetForm = () => formRef.value?.reset()

      return { formRef, formData, formItems, formResult, handleFormReset, handleFormSubmit, validateForm, resetForm }
    },
    template: `
      <div>
        <ProForm ref="formRef" v-model="formData" :items="formItems" @reset="handleFormReset" @submit="handleFormSubmit" />
        <div style="margin-top: 16px; background: #f9f9f9; border-radius: 8px; padding: 16px;">
          <p style="font-size: 14px; color: #666; margin-bottom: 8px;">提交数据:</p>
          <pre style="max-height: 160px; overflow: auto; font-size: 12px; margin: 0;">{{ formResult || '无' }}</pre>
        </div>
        <div style="margin-top: 16px; display: flex; gap: 8px;">
          <button @click="validateForm" style="padding: 6px 16px; border-radius: 4px; border: 1px solid #d9d9d9; cursor: pointer; background: #fff; font-size: 12px;">校验表单</button>
          <button @click="resetForm" style="padding: 6px 16px; border-radius: 4px; border: 1px solid #d9d9d9; cursor: pointer; background: #fff; font-size: 12px;">重置</button>
        </div>
      </div>
    `,
  }),
}
