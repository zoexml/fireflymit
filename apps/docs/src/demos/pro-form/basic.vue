<script setup lang="ts">
import type { FormItem } from '@fireflymit/ui'
import { ProForm } from '@fireflymit/ui'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({})
const result = ref('')

const items: FormItem[] = [
  { label: '用户名', key: 'name', type: 'input', placeholder: '请输入用户名', props: { clearable: true } },
  { label: '手机号', key: 'phone', type: 'input', props: { placeholder: '请输入手机号', maxlength: 11 } },
  {
    label: '用户等级',
    key: 'level',
    type: 'select',
    props: {
      placeholder: '请选择等级',
      clearable: true,
      options: [
        { label: '普通用户', value: 'normal' },
        { label: 'VIP 用户', value: 'vip' },
      ],
    },
  },
  { label: '是否启用', key: 'enabled', type: 'switch' },
  { label: '年龄', key: 'age', type: 'number' },
  {
    label: '创建日期',
    key: 'createdAt',
    type: 'date',
    props: { type: 'date', valueFormat: 'YYYY-MM-DD', placeholder: '请选择日期', style: { width: '100%' } },
  },
]

function handleSubmit(values: Record<string, any>) {
  result.value = JSON.stringify(values, null, 2)
}

function handleReset() {
  result.value = ''
}
</script>

<template>
  <div class="pro-form-demo">
    <ProForm
      v-model="formData"
      :items="items"
      @submit="handleSubmit"
      @reset="handleReset"
    />
    <div class="pro-form-demo__result">
      <span class="pro-form-demo__label">提交数据：</span>
      <pre v-if="result">{{ result }}</pre>
      <span v-else class="pro-form-demo__empty">暂无，点击「提交」后输出</span>
    </div>
  </div>
</template>

<style scoped>
.pro-form-demo__result {
  padding: 12px 16px;
  margin-top: 16px;
  font-size: 13px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.pro-form-demo__label {
  color: var(--vp-c-text-2);
}

.pro-form-demo__empty {
  color: var(--vp-c-text-3);
}

.pro-form-demo__result pre {
  padding: 0;
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.6;
  background-color: transparent;
}
</style>
