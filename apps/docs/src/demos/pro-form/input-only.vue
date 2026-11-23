<script setup lang="ts">
import type { FormItem } from '@fireflymit/ui'
import { ProForm } from '@fireflymit/ui'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({ name: '', phone: '' })
const result = ref('')

const items: FormItem[] = [
  { label: '用户名', key: 'name', type: 'input', placeholder: '请输入用户名', props: { clearable: true } },
  { label: '手机号', key: 'phone', type: 'input', props: { placeholder: '请输入手机号', maxlength: 11 } },
]

function handleSubmit(values: Record<string, any>) {
  result.value = JSON.stringify(values, null, 2)
}

function handleReset() {
  result.value = ''
}
</script>

<template>
  <div class="pro-form-input-demo">
    <ProForm
      v-model="formData"
      :items="items"
      @submit="handleSubmit"
      @reset="handleReset"
    />
    <p class="pro-form-input-demo__result">
      提交数据：{{ result || '暂无，点击「提交」后输出' }}
    </p>
  </div>
</template>

<style scoped>
.pro-form-input-demo__result {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
}
</style>
