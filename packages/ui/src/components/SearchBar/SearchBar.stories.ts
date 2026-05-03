import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SearchBar from './SearchBar.vue'

const meta: Meta<typeof SearchBar> = {
  title: 'UI/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const Basic: Story = {
  render: () => ({
    components: { SearchBar },
    setup() {
      const searchBasicData = ref({})
      const searchBasicResult = ref('')
      const searchFormItemsBasic = ref([
        { label: '用户名', key: 'name', type: 'input', placeholder: '请输入用户名', clearable: true },
        { label: '密码', key: 'password', type: 'input', props: { type: 'password', placeholder: '请输入密码', clearable: true } },
        { label: '手机号', key: 'phone', type: 'input', props: { placeholder: '请输入手机号', maxlength: 11 } },
        { label: '用户等级', key: 'level', type: 'select', props: {
          placeholder: '请选择等级',
          options: [
            { label: '普通用户', value: 'normal' },
            { label: 'VIP用户', value: 'vip' },
          ],
        } },
        { label: '地址', key: 'address', type: 'input', placeholder: '请输入地址' },
        { label: '性别', key: 'userGender', type: 'radiogroup', props: { options: [
          { label: '男', value: '1' },
          { label: '女', value: '2' },
        ] } },
      ])
      const handleBasicReset = () => { searchBasicResult.value = '' }
      const handleBasicSearch = (params: Record<string, any>) => { searchBasicResult.value = JSON.stringify(params, null, 2) }
      return { searchBasicData, searchBasicResult, searchFormItemsBasic, handleBasicReset, handleBasicSearch }
    },
    template: `
      <div>
        <SearchBar v-model="searchBasicData" :items="searchFormItemsBasic" @reset="handleBasicReset" @search="handleBasicSearch" />
        <p style="margin-top: 8px; font-size: 14px; color: #666;">搜索参数: {{ searchBasicResult || '无' }}</p>
      </div>
    `,
  }),
}
