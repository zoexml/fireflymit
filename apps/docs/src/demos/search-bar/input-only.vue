<script setup lang="ts">
import type { SearchFormItem } from '@fireflymit/ui'
import { SearchBar } from '@fireflymit/ui'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({ keyword: '', phone: '' })
const result = ref('')

const items: SearchFormItem[] = [
  { key: 'keyword', label: '关键词', type: 'input', props: { placeholder: '请输入关键词', clearable: true } },
  { key: 'phone', label: '手机号', type: 'input', props: { placeholder: '请输入手机号', maxlength: 11 } },
]

function handleSearch(params: Record<string, any>) {
  result.value = JSON.stringify(params, null, 2)
}

function handleReset() {
  result.value = ''
}
</script>

<template>
  <div class="search-bar-input-demo">
    <SearchBar
      v-model="formData"
      :items="items"
      @search="handleSearch"
      @reset="handleReset"
    />
    <p class="search-bar-input-demo__result">
      查询参数：{{ result || '暂无，点击「查询」后输出' }}
    </p>
  </div>
</template>

<style scoped>
.search-bar-input-demo__result {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
  white-space: pre-wrap;
}
</style>
