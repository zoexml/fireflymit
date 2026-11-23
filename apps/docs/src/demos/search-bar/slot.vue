<script setup lang="ts">
import type { SearchFormItem } from '@fireflymit/ui'
import { SearchBar } from '@fireflymit/ui'
import { ElOption, ElSelect } from 'element-plus'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({})

const items: SearchFormItem[] = [
  { key: 'keyword', label: '关键词', type: 'input', props: { placeholder: '请输入关键词', clearable: true } },
  { key: 'dept', label: '部门', type: 'select' },
  {
    key: 'status',
    label: '状态',
    type: 'select',
    props: {
      placeholder: '请选择状态',
      clearable: true,
      options: [
        { label: '启用', value: 'enabled' },
        { label: '停用', value: 'disabled' },
      ],
    },
  },
]

const departments = [
  { label: '研发部', value: 'rd' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' },
]
</script>

<template>
  <SearchBar v-model="formData" :items="items">
    <template #dept>
      <ElSelect v-model="formData.dept" placeholder="请选择部门" clearable>
        <ElOption v-for="dept in departments" :key="dept.value" v-bind="dept" />
      </ElSelect>
    </template>
  </SearchBar>
</template>
