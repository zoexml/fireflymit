<script setup lang="ts">
import type { SearchFormItem } from '@fireflymit/ui'
import { SearchBar } from '@fireflymit/ui'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({})
const result = ref('')

const items: SearchFormItem[] = [
  { key: 'name', label: '用户名', type: 'input', props: { placeholder: '请输入用户名', clearable: true } },
  {
    key: 'level',
    label: '用户等级',
    type: 'select',
    props: {
      placeholder: '请选择等级',
      clearable: true,
      options: [
        { label: '普通用户', value: 'normal' },
        { label: 'VIP 用户', value: 'vip' },
        { label: '高级 VIP', value: 'svip' },
      ],
    },
  },
  {
    key: 'gender',
    label: '性别',
    type: 'radiogroup',
    props: {
      options: [
        { label: '男', value: '1' },
        { label: '女', value: '2' },
      ],
    },
  },
  {
    key: 'createdAt',
    label: '创建日期',
    type: 'date',
    props: { type: 'date', valueFormat: 'YYYY-MM-DD', placeholder: '请选择日期', style: { width: '100%' } },
  },
  { key: 'enabled', label: '是否启用', type: 'switch' },
  { key: 'age', label: '年龄', type: 'number' },
]

function handleSearch(params: Record<string, any>) {
  result.value = JSON.stringify(params, null, 2)
}

function handleReset() {
  result.value = ''
}
</script>

<template>
  <div class="search-bar-demo">
    <SearchBar
      v-model="formData"
      :items="items"
      @search="handleSearch"
      @reset="handleReset"
    />
    <div class="search-bar-demo__result">
      <span class="search-bar-demo__label">查询参数：</span>
      <pre v-if="result">{{ result }}</pre>
      <span v-else class="search-bar-demo__empty">暂无，点击「查询」后输出</span>
    </div>
  </div>
</template>

<style scoped>
.search-bar-demo__result {
  padding: 12px 16px;
  margin-top: 16px;
  font-size: 13px;
  background-color: var(--vp-c-bg-alt);
  border-radius: 6px;
}

.search-bar-demo__label {
  color: var(--vp-c-text-2);
}

.search-bar-demo__empty {
  color: var(--vp-c-text-3);
}

.search-bar-demo__result pre {
  padding: 0;
  margin: 8px 0 0;
  font-size: 12px;
  line-height: 1.6;
  background-color: transparent;
}
</style>
