<script setup lang="ts">
import { ProForm } from '@fireflymit/ui'
import { computed, ref } from 'vue'

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
</script>

<template>
  <div class="w-full">
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
</template>
