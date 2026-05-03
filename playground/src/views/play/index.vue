<script setup lang="ts">
import { Badge, Banner, CardBanner, ContextMenu, CountTo, DragVerify, ProForm, SearchBar, SvgIcon, TextScroll } from '@fireflymit/ui'
import { ElMessage } from 'element-plus'
import { computed, nextTick, ref } from 'vue'

const activeComponent = ref('Badge')

const components = [
  { label: 'Badge', value: 'Badge' },
  { label: 'CountTo', value: 'CountTo' },
  { label: 'DragVerify', value: 'DragVerify' },
  { label: 'ContextMenu', value: 'ContextMenu' },
  { label: 'SearchBar', value: 'SearchBar' },
  { label: 'ProForm', value: 'ProForm' },
  { label: 'TextScroll', value: 'TextScroll' },
  { label: 'SvgIcon', value: 'SvgIcon' },
  { label: 'Banner', value: 'Banner' },
]

// ========================================
// Badge - 徽章标签
// ========================================

const badgeTypes = ['primary', 'success', 'warning', 'info', 'error'] as const

// ========================================
// CountTo - 数字滚动
// ========================================

const countToRef = ref()
const controlTarget = ref(0)
const easingTarget = ref(0)

const easingTypes = [
  { name: 'Linear', type: 'linear' },
  { name: 'Ease Out Cubic', type: 'easeOutCubic' },
  { name: 'Ease Out Expo', type: 'easeOutExpo' },
  { name: 'Ease Out Sine', type: 'easeOutSine' },
  { name: 'Ease In Out', type: 'easeInOutCubic' },
  { name: 'Ease In Quad', type: 'easeInQuad' },
] as const

const startCount = () => {
  controlTarget.value = 5000
  countToRef.value?.start(5000)
}

const pauseCount = () => {
  countToRef.value?.pause()
}

const resetCount = () => {
  countToRef.value?.reset()
  controlTarget.value = 0
}

const triggerEasing = () => {
  easingTarget.value = easingTarget.value === 0 ? 1000 : 0
}

// ========================================
// DragVerify - 拖动验证
// ========================================

const dragPassed = ref(false)
const dragVerifyRef = ref()

// ========================================
// ContextMenu - 右键菜单
// ========================================

const menuRef = ref<InstanceType<typeof ContextMenu>>()
const lastAction = ref('')

const menuItems = ref([
  { key: 'copy', label: '复制', icon: 'ri:file-copy-line' },
  { key: 'paste', label: '粘贴', icon: 'ri:capsule-line' },
  { key: 'cut', label: '剪切', icon: 'ri:clipboard-line', showLine: true },
  {
    key: 'export',
    label: '导出选项',
    icon: 'ri:export-line',
    children: [
      { key: 'exportExcel', label: '导出 Excel', icon: 'ri:file-excel-2-line' },
      { key: 'exportPdf', label: '导出 PDF', icon: 'ri:file-pdf-2-line' },
    ],
  },
  {
    key: 'edit',
    label: '编辑选项',
    icon: 'ri:edit-2-line',
    children: [
      { key: 'rename', label: '重命名' },
      { key: 'duplicate', label: '复制副本' },
    ],
  },
  { key: 'share', label: '分享', icon: 'ri:share-forward-line', showLine: true },
  { key: 'delete', label: '删除', icon: 'ri:delete-bin-line' },
  { key: 'disabled', label: '禁用选项', icon: 'ri:close-circle-line', disabled: true },
])

const handleSelect = (item: any) => {
  lastAction.value = `${item.label} (${item.key})`
  ElMessage.success(`执行操作: ${item.label}`)
}

const showMenu = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  nextTick(() => {
    menuRef.value?.show(e)
  })
}

const demoBox = 'p-5 mb-4 text-2xl font-semibold text-center bg-gray-50 rounded-lg tabular-nums border border-gray-200'

// ========================================
// SearchBar - 搜索表单
// ========================================

const searchBarBasicRef = ref()
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

// ========================================
// ProForm - 通用表单
// ========================================

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
const labelWidth = ref(100)
const labelPosition = ref<'right' | 'left' | 'top'>('right')
const span = ref(6)
const gutter = ref(12)
const showUserName = ref(true)
const formRules = {
  name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
}

const LEVEL_OPTIONS = [
  { label: '普通用户', value: 'normal' },
  { label: 'VIP用户', value: 'vip' },
  { label: '高级VIP', value: 'svip' },
]

const GENDER_OPTIONS = [
  { label: '男', value: '1' },
  { label: '女', value: '2' },
]

const userFormItem = ref({
  label: '用户名',
  key: 'name',
  type: 'input' as const,
  placeholder: '请输入用户名',
  clearable: true,
})

const formItems = computed(() => [
  ...(showUserName.value ? [userFormItem.value] : []),
  {
    label: '手机号',
    key: 'phone',
    type: 'input',
    props: { placeholder: '请输入手机号', maxlength: 11, clearable: true },
  },
  {
    label: '用户等级',
    key: 'level',
    type: 'select',
    props: {
      placeholder: '请选择等级',
      options: LEVEL_OPTIONS,
      clearable: true,
    },
  },
  {
    label: '地址',
    key: 'address',
    type: 'input',
    placeholder: '请输入地址',
    clearable: true,
  },
  {
    label: '日期',
    key: 'date',
    type: 'datetime',
    props: {
      style: { width: '100%' },
      placeholder: '请选择日期',
      type: 'date',
      valueFormat: 'YYYY-MM-DD',
    },
  },
  {
    label: '日期范围',
    key: 'daterange',
    type: 'datetime',
    props: {
      type: 'daterange',
      valueFormat: 'YYYY-MM-DD',
      rangeSeparator: '至',
      startPlaceholder: '开始日期',
      endPlaceholder: '结束日期',
    },
  },
  {
    label: '性别',
    key: 'userGender',
    type: 'radiogroup',
    props: {
      options: GENDER_OPTIONS,
    },
  },
  {
    label: '是否启用',
    key: 'status',
    type: 'switch',
  },
  {
    label: '年龄',
    key: 'age',
    type: 'number',
  },
  {
    label: '评分',
    key: 'rate',
    type: 'rate',
    props: {
      size: 'large',
      placeholder: '请选择评分',
    },
  },
  {
    label: '多行输入',
    key: 'remark',
    type: 'input',
    props: {
      placeholder: '请输入备注',
      type: 'textarea',
      rows: 2,
    },
  },
  {
    label: '隐藏字段',
    key: 'hiddenField',
    type: 'input',
    hidden: true,
  },
  {
    label: '栅格演示',
    key: 'gridDemo',
    type: 'input',
    span: 12,
    placeholder: 'span=12 占一半宽度',
    clearable: true,
  },
  {
    label: '栅格演示2',
    key: 'gridDemo2',
    type: 'input',
    span: 12,
    placeholder: '两个 span=12 占满一行',
    clearable: true,
  },
])

const handleFormReset = () => {
  formResult.value = ''
}

const handleFormSubmit = (params: Record<string, any>) => {
  formResult.value = JSON.stringify(params, null, 2)
}

const validateForm = () => formRef.value?.validate()
const resetForm = () => formRef.value?.reset()

// ========================================
// Banner - 横幅展示
// ========================================

const handleBannerClick = (text: string) => {
  ElMessage.success(`点击了: ${text}`)
}

const bannerBaseBg = 'background: linear-gradient(135deg, #409eff 0%, #337ecc 100%)'
const bannerCyanBg = 'background: #D4F1F7'
const bannerPinkBg = 'background: #FF8AAB'
const bannerDarkBg = 'background: #1a1a2e'
const bannerBlueBg = 'background: #70B1FF'
const bannerPurpleBg = 'background: #e0e0f0'

const bannerImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCI+PHJlY3QgZmlsbD0iI2UwZTBmMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIHJ4PSI4Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjYjNiN2ViIi8+PHBhdGggZD0iTTAgMTIwbDUwLTQwIDMwIDIwIDQwLTMwIDgwIDYwSDB6IiBmaWxsPSIjYjNiN2ViIi8+PC9zdmc+'

// ========================================
// TextScroll - 文字滚动
// ========================================

const handleTextScrollClose = () => {
  ElMessage.info('已关闭')
}
</script>

<template>
  <div class="page-layout h-full flex flex-col">
    <!-- 组件切换 -->
    <div class="z-10 mb-4 flex flex-wrap gap-2 rounded-lg bg-gray-100 p-3">
      <el-radio-group v-model="activeComponent" size="small">
        <el-radio-button v-for="item in components" :key="item.value" :value="item.value">
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="flex-1 overflow-auto px-4 pb-16">
      <!-- Badge -->
      <div v-show="activeComponent === 'Badge'" class="flex flex-wrap gap-3">
        <Badge v-for="type in badgeTypes" :key="type" :type="type" :text="type" />
      </div>

      <!-- CountTo -->
      <div v-show="activeComponent === 'CountTo'" class="max-w-3xl w-full">
        <div class="mb-6">
          <h3 class="mb-3 text-base font-medium">
            基础用法
          </h3>
          <div :class="demoBox">
            <CountTo :target="1000" :duration="2000" />
          </div>
        </div>

        <div class="mb-6">
          <h3 class="mb-3 text-base font-medium">
            带前缀后缀
          </h3>
          <div :class="demoBox">
            <CountTo :target="20000" :duration="2500" prefix="¥" suffix="元" :decimals="2" />
          </div>
        </div>

        <div class="mb-6">
          <h3 class="mb-3 text-base font-medium">
            千分位分隔符
          </h3>
          <div :class="demoBox">
            <CountTo :target="2023.45" :duration="3000" :decimals="2" separator="," />
          </div>
        </div>

        <div class="mb-6">
          <h3 class="mb-3 text-base font-medium">
            动画效果对比
          </h3>
          <div class="grid grid-cols-3 mb-4 gap-3">
            <div v-for="easing in easingTypes" :key="easing.type" class="text-center">
              <div class="mb-1 text-xs text-gray-500">
                {{ easing.name }}
              </div>
              <div :class="demoBox">
                <CountTo :target="easingTarget" :duration="3000" :easing="easing.type" />
              </div>
            </div>
          </div>
          <div class="text-center">
            <el-button size="small" @click="triggerEasing">
              触发所有动画
            </el-button>
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            控制按钮
          </h3>
          <div :class="demoBox">
            <CountTo ref="countToRef" :target="controlTarget" :duration="2000" />
          </div>
          <div class="flex justify-center gap-3">
            <el-button size="small" @click="startCount">
              开始
            </el-button>
            <el-button size="small" @click="pauseCount">
              暂停
            </el-button>
            <el-button size="small" @click="resetCount">
              重置
            </el-button>
          </div>
        </div>
      </div>

      <!-- DragVerify -->
      <div v-show="activeComponent === 'DragVerify'" class="max-w-lg w-full">
        <div class="p-4">
          <DragVerify ref="dragVerifyRef" v-model="dragPassed" text="拖动以验证" success-text="验证通过" />
        </div>
        <div class="mt-4">
          <el-space>
            <el-text size="small">
              状态: {{ dragPassed ? '通过' : '未通过' }}
            </el-text>
            <el-button size="small" @click="dragVerifyRef?.reset()">
              重置
            </el-button>
          </el-space>
        </div>
      </div>

      <!-- ContextMenu -->
      <div v-show="activeComponent === 'ContextMenu'" class="max-w-lg w-full">
        <el-button @contextmenu.prevent="showMenu">
          右键触发菜单
        </el-button>
        <p class="mt-4 text-sm text-gray-500">
          最后操作: {{ lastAction || '无' }}
        </p>
        <ContextMenu ref="menuRef" :menu-items="menuItems" :menu-width="180" :submenu-width="140" :border-radius="10" @select="handleSelect" />
      </div>

      <!-- SearchBar -->
      <div v-show="activeComponent === 'SearchBar'" class="w-full">
        <h3 class="mb-3 text-base font-medium">
          基础示例（默认收起）
        </h3>
        <SearchBar
          ref="searchBarBasicRef" v-model="searchBasicData" :items="searchFormItemsBasic" @reset="handleBasicReset"
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

      <!-- ProForm -->
      <div v-show="activeComponent === 'ProForm'" class="w-full">
        <h3 class="mb-3 text-base font-medium">
          基础表单
        </h3>
        <ProForm
          ref="formRef" v-model="formData" :items="formItems" :rules="formRules" :label-width="labelWidth" :label-position="labelPosition"
          :span="span" :gutter="gutter" @reset="handleFormReset" @submit="handleFormSubmit"
        />
        <div class="mt-4 rounded-lg bg-gray-50 p-4">
          <p class="mb-2 text-sm text-gray-500">
            提交数据:
          </p>
          <pre class="max-h-40 overflow-auto text-xs">{{ formResult || '无' }}</pre>
        </div>
        <div class="mt-4">
          <h4 class="mb-2 text-sm text-gray-600 font-medium">
            动态操作
          </h4>
          <el-space wrap>
            <el-button size="small" @click="validateForm">
              校验表单
            </el-button>
            <el-button size="small" @click="resetForm">
              重置
            </el-button>
            <el-button size="small" @click="showUserName = !showUserName">
              {{ showUserName ? '隐藏' : '显示' }}用户名
            </el-button>
            <el-button size="small" @click="labelWidth = 120">
              Label 加宽
            </el-button>
            <el-button size="small" @click="span = 8">
              span=8
            </el-button>
            <el-button size="small" @click="labelPosition = 'left'">
              Label 左对齐
            </el-button>
            <el-button size="small" @click="labelPosition = 'top'">
              Label 顶部
            </el-button>
          </el-space>
        </div>
      </div>

      <!-- Banner -->
      <div v-show="activeComponent === 'Banner'" class="max-w-3xl w-full space-y-6">
        <div>
          <h3 class="mb-3 text-base font-medium">
            基础用法
          </h3>
          <div class="overflow-hidden rounded-lg" :style="bannerBaseBg">
            <Banner title="Art Design Pro" subtitle="一款兼具设计美学与高效开发的后台系统" @click="handleBannerClick('基础用法')" />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            自定义颜色
          </h3>
          <div class="overflow-hidden rounded-lg" :style="bannerCyanBg">
            <Banner
              title="自定义颜色" subtitle="支持自定义标题、副标题和按钮颜色" title-color="#333" subtitle-color="#666" :button-config="{
                show: true,
                text: '立即体验',
                color: '#67c23a',
                textColor: '#fff',
              }" @click="handleBannerClick('自定义颜色')"
            />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            按钮配置
          </h3>
          <div class="overflow-hidden rounded-lg" :style="bannerPinkBg">
            <Banner
              title="按钮自定义" subtitle="可以自定义按钮文本和样式" :button-config="{
                show: true,
                text: '了解更多',
                color: '#FF5A89',
                textColor: '#fff',
                radius: '8px',
              }" @click="handleBannerClick('按钮配置')"
            />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            流星效果
          </h3>
          <div class="overflow-hidden rounded-lg" :style="bannerDarkBg">
            <Banner title="流星动画" subtitle="背景带有流星动画装饰效果" :meteor-config="{ enabled: true, count: 15 }" dark @click="handleBannerClick('流星效果')" />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            图片配置
          </h3>
          <div class="overflow-hidden rounded-lg" :style="bannerBlueBg">
            <Banner
              title="探索星空计划" subtitle="加入我们的天文观测活动，发现宇宙的奥秘" :image-config="{
                src: bannerImg,
                width: '10rem',
                bottom: '-2rem',
                right: '2rem',
              }" @click="handleBannerClick('图片配置')"
            />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            简洁模式
          </h3>
          <div class="overflow-hidden rounded-lg" :style="bannerPurpleBg">
            <Banner title="简洁模式" subtitle="关闭装饰效果的纯色横幅" :decoration="false" @click="handleBannerClick('简洁模式')" />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            CardBanner 基础用法
          </h3>
          <div class="rounded-xl bg-gray-50 p-6">
            <CardBanner title="卡片横幅" description="这是一款卡片样式的横幅组件，支持标题和描述展示" @click="handleBannerClick('CardBanner基础')" />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            CardBanner 按钮配置
          </h3>
          <div class="rounded-xl bg-gray-50 p-6">
            <CardBanner
              title="自定义按钮" description="支持主按钮和取消按钮的配置" :button="{
                show: true,
                text: '查看详情',
                color: '#67c23a',
                textColor: '#fff',
              }" :cancel-button="{
                show: true,
                text: '稍后再说',
                color: '#f5f5f5',
                textColor: '#666',
              }" @click="handleBannerClick('CardBanner按钮')"
            />
          </div>
        </div>

        <div>
          <h3 class="mb-3 text-base font-medium">
            CardBanner 带图片
          </h3>
          <div class="rounded-xl bg-gray-50 p-6">
            <CardBanner title="图片卡片" description="带有背景图片的卡片横幅组件" :image="bannerImg" @click="handleBannerClick('CardBanner图片')" />
          </div>
        </div>
      </div>

      <!-- TextScroll -->
      <div v-show="activeComponent === 'TextScroll'" class="max-w-3xl w-full space-y-4">
        <TextScroll text="Art Design Pro 是一款兼具设计美学与高效开发的后台系统" showClose />
        <TextScroll type="success" text="这是一条成功类型的滚动公告" />
        <TextScroll type="warning" text="这是一条警告类型的滚动公告" />
        <TextScroll type="danger" text="这是一条危险类型的滚动公告" />
        <TextScroll type="info" text="这是一条信息类型的滚动公告" />
        <TextScroll text="这是一条可关闭的滚动公告" @close="handleTextScrollClose" />
        <TextScroll type="warning" text="这是一条速度较慢、向右滚动的公告" :speed="30" direction="right" />
        <TextScroll text="这是一条文字溢出才会滚动的公告，当文本内容超出容器宽度时才会开始滚动" :alwaysScroll="false" @close="handleTextScrollClose" />
        <TextScroll type="danger" direction="up" :speed="30" text="这是一条向上滚动的公告" />
        <TextScroll type="info" direction="down" :speed="30" text="这是一条向下滚动的公告" />
      </div>

      <!-- SvgIcon -->
      <div v-show="activeComponent === 'SvgIcon'" class="max-w-3xl w-full space-y-6">
        <div>
          <h3 class="mb-4 text-lg font-semibold">
            Remix Icon
          </h3>
          <div class="flex flex-wrap items-center gap-6">
            <SvgIcon icon="ri:github-fill" class="text-2xl" />
            <SvgIcon icon="ri:copilot-line" class="text-2xl text-blue-500" />
            <SvgIcon icon="ri:edge-line" class="text-2xl text-gray-600" />
            <SvgIcon icon="ri:planet-line" class="text-2xl text-yellow-500" />
            <SvgIcon icon="ri:windows-line" class="text-2xl text-cyan-500" />
            <SvgIcon icon="ri:thumb-up-line" class="text-2xl text-red-500" />
            <SvgIcon icon="ri:gift-2-line" class="text-2xl text-green-500" />
            <SvgIcon icon="ri:apple-line" class="text-2xl text-gray-500" />
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-semibold">
            Spinners
          </h3>
          <div class="flex flex-wrap items-center gap-6">
            <SvgIcon icon="svg-spinners:3-dots-fade" class="text-2xl text-red-400" />
            <SvgIcon icon="svg-spinners:3-dots-bounce" class="text-2xl text-blue-400" />
            <SvgIcon icon="svg-spinners:3-dots-move" class="text-2xl text-orange-400" />
            <SvgIcon icon="svg-spinners:3-dots-rotate" class="text-2xl text-purple-400" />
            <SvgIcon icon="svg-spinners:clock" class="text-2xl text-yellow-500" />
            <SvgIcon icon="svg-spinners:tadpole" class="text-2xl text-orange-500" />
            <SvgIcon icon="svg-spinners:blocks-wave" class="text-2xl text-blue-500" />
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-semibold">
            Material Line Icons
          </h3>
          <div class="flex flex-wrap items-center gap-6">
            <SvgIcon icon="line-md:phone-call-twotone-loop" class="text-2xl text-blue-500" />
            <SvgIcon icon="line-md:switch-off" class="text-2xl text-green-500" />
            <SvgIcon icon="line-md:sun-rising-filled-loop" class="text-2xl text-yellow-400" />
            <SvgIcon icon="line-md:volume-high-filled" class="text-2xl text-purple-500" />
            <SvgIcon icon="line-md:github-twotone" class="text-2xl text-gray-700" />
            <SvgIcon icon="line-md:telegram" class="text-2xl text-sky-500" />
            <SvgIcon icon="line-md:reddit-loop" class="text-2xl text-orange-400" />
            <SvgIcon icon="line-md:coffee-half-empty-filled-loop" class="text-2xl text-emerald-500" />
          </div>
        </div>

        <div>
          <h3 class="mb-4 text-lg font-semibold">
            使用示例
          </h3>
          <div class="space-y-4">
            <div>
              <p class="mb-2 text-sm text-gray-500">
                基础使用
              </p>
              <pre class="rounded-lg bg-gray-50 p-4 text-sm">&lt;SvgIcon icon="ri:home-line" /&gt;</pre>
            </div>
            <div>
              <p class="mb-2 text-sm text-gray-500">
                自定义大小
              </p>
              <pre class="rounded-lg bg-gray-50 p-4 text-sm">&lt;SvgIcon icon="ri:user-line" class="text-2xl" /&gt;</pre>
            </div>
            <div>
              <p class="mb-2 text-sm text-gray-500">
                自定义颜色
              </p>
              <pre class="rounded-lg bg-gray-50 p-4 text-sm">&lt;SvgIcon icon="ri:heart-fill" class="text-red-500" /&gt;</pre>
            </div>
            <div>
              <p class="mb-2 text-sm text-gray-500">
                组合使用
              </p>
              <pre class="rounded-lg bg-gray-50 p-4 text-sm">&lt;SvgIcon icon="ri:star-fill" class="text-4xl text-yellow-500" /&gt;</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  width: 100%;
  height: 100%;
  overflow: auto;
}
</style>
