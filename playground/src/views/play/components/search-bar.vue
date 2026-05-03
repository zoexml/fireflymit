<script setup lang="ts">
import { SearchBar } from '@fireflymit/ui'
import { ElMessage } from 'element-plus'
import { computed, h, ref } from 'vue'

const searchBarAdvancedRef = ref()
const searchBasicResult = ref('')
const searchAdvancedResult = ref('')

const searchBasicData = ref<Record<string, any>>({
  name: undefined,
  phone: undefined,
  level: undefined,
  address: undefined,
  date: undefined,
  daterange: undefined,
  status: undefined,
})

const searchAdvancedData = ref<Record<string, any>>({
  name: undefined,
  phone: undefined,
  level: undefined,
  address: undefined,
  slots: undefined,
  date: undefined,
  daterange: undefined,
  cascader: undefined,
  checkboxgroup: undefined,
  userGender: undefined,
  systemName: undefined,
})

const rulesAdvanced = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { min: 11, max: 11, message: '请输入11位手机号', trigger: 'blur' },
  ],
  address: [{ required: true, message: '请输入地址', trigger: 'blur' }],
}

const sbSpanAdvanced = ref(6)
const sbGutterAdvanced = ref(12)
const sbLabelWidthAdvanced = ref(100)
const sbLabelPositionAdvanced = ref<'right' | 'left' | 'top'>('right')
const sbShowUserName = ref(true)

const sbLevelOptions = ref<{ label: string, value: string, disabled?: boolean }[]>([])

const SB_LEVEL_OPTIONS = [
  { label: '普通用户', value: 'normal' },
  { label: 'VIP用户', value: 'vip' },
  { label: '高级VIP', value: 'svip' },
  { label: '企业用户', value: 'enterprise', disabled: true },
]

const SB_GENDER_OPTIONS = [
  { label: '男', value: '1' },
  { label: '女', value: '2' },
]

const SB_CASCADE_OPTIONS = [
  {
    value: 'guide',
    label: '指南',
    children: [
      { value: 'disciplines', label: '规范', children: [{ value: 'consistency', label: '一致性' }] },
    ],
  },
  {
    value: 'components',
    label: '组件',
    children: [
      { value: 'basic', label: '基础组件', children: [{ value: 'button', label: '按钮' }] },
    ],
  },
]

const SB_TREE_DATA = [
  {
    value: '1',
    label: '一级 1',
    children: [{ value: '1-1', label: '二级 1-1', children: [{ value: '1-1-1', label: '三级 1-1-1' }] }],
  },
  {
    value: '2',
    label: '一级 2',
    children: [{ value: '2-1', label: '二级 2-1', children: [{ value: '2-1-1', label: '三级 2-1-1' }] }],
  },
]

const SB_CHECKBOX_OPTIONS = [
  { label: '选项1', value: 'option1' },
  { label: '选项2', value: 'option2' },
  { label: '选项3', value: 'option3' },
  { label: '选项4', value: 'option4' },
]

const fetchSbLevelOptions = (): Promise<typeof sbLevelOptions.value> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 500, SB_LEVEL_OPTIONS)
  })
}

const getSbLevelOptions = async () => {
  sbLevelOptions.value = await fetchSbLevelOptions()
  if (sbLevelOptions.value.length) ElMessage.success('成功获取到数据')
}

const sbUserItem = ref({
  label: '用户名',
  key: 'name',
  type: 'input' as const,
  props: { placeholder: '请输入用户名', clearable: true },
})

const sbDynamicItems = ref<any[]>([])
let sbDynamicCounter = 0

const searchFormItemsBasic = computed(() => [
  { label: '用户名', key: 'name', type: 'input', placeholder: '请输入用户名', clearable: true },
  { label: '密码', key: 'password', type: 'input', props: { type: 'password', placeholder: '请输入密码', clearable: true } },
  { label: '手机号', key: 'phone', type: 'input', props: { placeholder: '请输入手机号', maxlength: 11 } },
  { label: '用户等级', key: 'level', type: 'select', props: { placeholder: '请选择等级', options: SB_LEVEL_OPTIONS } },
  { label: '地址', key: 'address', type: 'input', placeholder: '请输入地址' },
  {
    label: '日期',
    key: 'date',
    type: 'datetime',
    props: { style: { width: '100%' }, placeholder: '请选择日期', type: 'date', valueFormat: 'YYYY-MM-DD' },
  },
  { label: '性别', key: 'userGender', type: 'radiogroup', props: { options: SB_GENDER_OPTIONS } },
])

const searchFormItemsAdvanced = computed(() => [
  ...(sbShowUserName.value ? [sbUserItem.value] : []),
  ...sbDynamicItems.value,
  { label: '手机号', key: 'phone', type: 'input', props: { placeholder: '请输入手机号', maxlength: 11, clearable: true } },
  { label: '用户等级', key: 'level', type: 'select', props: { placeholder: '请选择等级', options: sbLevelOptions.value, clearable: true } },
  { label: '地址', key: 'address', type: 'input', placeholder: '请输入地址', clearable: true },
  {
    label: '日期',
    key: 'date',
    type: 'datetime',
    props: { style: { width: '100%' }, placeholder: '请选择日期', type: 'date', valueFormat: 'YYYY-MM-DD' },
  },
  {
    label: '日期时间',
    key: 'datetime',
    type: 'datetime',
    props: { style: { width: '100%' }, placeholder: '请选择日期时间', type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
  },
  {
    label: '日期范围',
    key: 'daterange',
    type: 'datetime',
    props: { type: 'daterange', valueFormat: 'YYYY-MM-DD', rangeSeparator: '至', startPlaceholder: '开始日期', endPlaceholder: '结束日期' },
  },
  {
    label: '日期时间范围',
    key: 'datetimerange',
    type: 'datetime',
    props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss', rangeSeparator: '至', startPlaceholder: '开始时间', endPlaceholder: '结束时间' },
  },
  {
    label: '时间选择',
    key: 'timeselect',
    type: 'timeselect',
    props: { placeholder: '请选择时间', type: 'time', valueFormat: 'HH:mm:ss' },
  },
  {
    label: '时间选择器',
    key: 'timepicker',
    type: 'timepicker',
    props: { style: { width: '100%' }, placeholder: '请选择时间', type: 'time', valueFormat: 'HH:mm:ss' },
  },
  {
    label: '级联选择',
    key: 'cascader',
    type: 'cascader',
    props: { placeholder: '请选择级联', clearable: true, style: { width: '100%' }, options: SB_CASCADE_OPTIONS },
  },
  {
    label: '树型选择',
    key: 'treeSelect',
    type: 'treeselect',
    props: { showCheckbox: true, multiple: true, clearable: true, data: SB_TREE_DATA },
  },
  { label: '插槽', key: 'slots', type: 'input', placeholder: '插槽渲染' },
  {
    label: '复选框',
    key: 'checkboxgroup',
    type: 'checkboxgroup',
    span: 12,
    props: { options: SB_CHECKBOX_OPTIONS },
  },
  { label: '性别', key: 'userGender', type: 'radiogroup', props: { options: SB_GENDER_OPTIONS } },
  { label: '是否启用', key: 'isEnabled', type: 'switch' },
  {
    label: '年龄',
    key: 'age',
    type: 'number',
    slots: { suffix: () => h('span', { style: 'color: #909399; font-size: 12px' }, '岁') },
  },
  {
    label: '事件演示',
    key: 'event',
    type: 'input',
    props: { placeholder: '输入内容触发事件', clearable: true, onInput: (val: string) => console.log('输入', val), onClear: () => console.log('清空') },
  },
  {
    label: '多行输入',
    key: 'remark',
    type: 'input',
    props: { placeholder: '请输入备注', type: 'textarea', rows: 2 },
  },
  {
    label: '评分',
    key: 'rate',
    type: 'rate',
    props: { size: 'large', placeholder: '请选择评分' },
  },
  {
    label: '滑块',
    key: 'slider',
    type: 'slider',
  },
  { label: '隐藏', key: 'hidden', type: 'input', hidden: true },
  {
    label: '条件隐藏',
    key: 'systemName',
    type: 'input',
    hidden: searchAdvancedData.value.systemName === 'mac',
    placeholder: '输入 mac 隐藏',
  },
  { label: '栅格1', key: 'sg1', type: 'input', span: 12, placeholder: 'span=12', clearable: true },
  { label: '栅格2', key: 'sg2', type: 'input', span: 12, placeholder: 'span=12', clearable: true },
])

const handleBasicReset = () => { searchBasicResult.value = '' }
const handleBasicSearch = (params: Record<string, any>) => { searchBasicResult.value = JSON.stringify(params, null, 2) }
const handleAdvancedReset = () => { searchAdvancedResult.value = '' }
const handleAdvancedSearch = async (params: Record<string, any>) => {
  await searchBarAdvancedRef.value.validate()
  searchAdvancedResult.value = JSON.stringify(params, null, 2)
}

const advancedValidate = () => searchBarAdvancedRef.value.validate()
const advancedReset = () => searchBarAdvancedRef.value.reset()

const updateSbUserName = () => {
  sbUserItem.value = { ...sbUserItem.value, label: '昵称', props: { placeholder: '请输入昵称', clearable: true } }
}
const deleteSbUserName = () => {
  sbShowUserName.value = false
  searchAdvancedData.value.name = undefined
}

const addSbFormItem = () => {
  sbDynamicCounter++
  sbDynamicItems.value.push({
    label: `动态字段${sbDynamicCounter}`,
    key: `dynamic_${sbDynamicCounter}`,
    type: 'input',
    props: { placeholder: `请输入动态字段${sbDynamicCounter}`, clearable: true },
  })
  ElMessage.success('已新增')
}
const updateSbFormItem = () => {
  if (!sbDynamicItems.value.length) { ElMessage.warning('请先新增'); return }
  const idx = sbDynamicItems.value.length - 1
  sbDynamicItems.value[idx] = {
    ...sbDynamicItems.value[idx],
    label: '已修改',
    type: 'select',
    props: { placeholder: '请选择', clearable: true, options: [{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }] },
  }
  ElMessage.success('已修改')
}
const deleteSbFormItem = () => {
  if (!sbDynamicItems.value.length) { ElMessage.warning('无动态项'); return }
  const item = sbDynamicItems.value.pop()
  delete searchAdvancedData.value[item.key]
  ElMessage.success('已删除')
}
const batchAddSbItems = () => {
  const items = [
    { label: '公司名称', key: `company_${++sbDynamicCounter}`, type: 'input', props: { placeholder: '请输入公司名称', clearable: true } },
    { label: '部门', key: `dept_${++sbDynamicCounter}`, type: 'select', props: { placeholder: '请选择', clearable: true, options: [{ label: '技术部', value: 'tech' }, { label: '产品部', value: 'product' }] } },
    { label: '入职日期', key: `joinDate_${++sbDynamicCounter}`, type: 'datetime', props: { placeholder: '请选择', clearable: true, type: 'date', valueFormat: 'YYYY-MM-DD' } },
  ]
  sbDynamicItems.value.push(...items)
  ElMessage.success(`批量新增 ${items.length} 项`)
}
const resetSbDynamicItems = () => {
  sbDynamicItems.value.forEach(item => delete searchAdvancedData.value[item.key])
  sbDynamicItems.value = []
  sbDynamicCounter = 0
  ElMessage.success('已重置动态项')
}
</script>

<template>
  <div class="w-full">
    <h3 class="mb-3 text-base font-medium">
      基础示例（默认收起）
    </h3>
    <SearchBar
      v-model="searchBasicData" :items="searchFormItemsBasic" @reset="handleBasicReset"
      @search="handleBasicSearch"
    />
    <p class="mt-2 text-sm text-gray-500">
      搜索参数: {{ searchBasicResult || '无' }}
    </p>

    <h3 class="mb-3 mt-5 text-base font-medium">
      完整示例（默认展开）
    </h3>
    <SearchBar
      ref="searchBarAdvancedRef" v-model="searchAdvancedData" :items="searchFormItemsAdvanced" :rules="rulesAdvanced"
      :default-expanded="true" :label-width="sbLabelWidthAdvanced" :label-position="sbLabelPositionAdvanced" :span="sbSpanAdvanced"
      :gutter="sbGutterAdvanced" @reset="handleAdvancedReset" @search="handleAdvancedSearch"
    >
      <template #slots>
        <el-input v-model="searchAdvancedData.slots" placeholder="我是插槽渲染出来的组件" />
      </template>
    </SearchBar>
    <div class="mt-4 rounded-lg bg-gray-50 p-4">
      <pre class="max-h-40 overflow-auto text-xs">{{ searchAdvancedResult || '无' }}</pre>
    </div>

    <div class="mt-5">
      <h4 class="mb-2 text-sm text-gray-600 font-medium">
        动态表单操作
      </h4>
      <el-space wrap class="mb-3">
        <el-button size="small" @click="getSbLevelOptions">
          获取用户等级数据
        </el-button>
        <el-button size="small" @click="addSbFormItem">
          新增表单项
        </el-button>
        <el-button size="small" @click="updateSbFormItem">
          修改表单项
        </el-button>
        <el-button size="small" @click="deleteSbFormItem">
          删除表单项
        </el-button>
        <el-button size="small" @click="batchAddSbItems">
          批量新增
        </el-button>
        <el-button size="small" @click="resetSbDynamicItems">
          重置动态项
        </el-button>
      </el-space>

      <h4 class="mb-2 text-sm text-gray-600 font-medium">
        其他操作
      </h4>
      <el-space wrap>
        <el-button size="small" @click="advancedValidate">
          校验表单
        </el-button>
        <el-button size="small" @click="advancedReset">
          重置
        </el-button>
        <el-button v-if="sbShowUserName" size="small" @click="updateSbUserName">
          修改用户名
        </el-button>
        <el-button v-if="sbShowUserName" size="small" @click="deleteSbUserName">
          删除用户名
        </el-button>
        <el-button size="small" @click="sbLabelWidthAdvanced = 120">
          修改 label 宽度
        </el-button>
        <el-button size="small" @click="sbSpanAdvanced = 8">
          span=8
        </el-button>
        <el-button size="small" @click="sbGutterAdvanced = 50">
          修改 gutter
        </el-button>
        <el-button size="small" @click="sbLabelPositionAdvanced = 'left'">
          Label 左对齐
        </el-button>
        <el-button size="small" @click="sbLabelPositionAdvanced = 'top'">
          Label 顶部
        </el-button>
      </el-space>
    </div>
  </div>
</template>
