<script setup lang="ts">
import type { FormItem } from '@fireflymit/ui'
import { ProForm } from '@fireflymit/ui'
import { ElOption, ElSelect } from 'element-plus'
import { ref } from 'vue'

const formData = ref<Record<string, any>>({})

const items: FormItem[] = [
  { label: '关键词', key: 'keyword', type: 'input', props: { placeholder: '请输入关键词', clearable: true } },
  { label: '部门', key: 'dept', type: 'select' },
]

const departments = [
  { label: '研发部', value: 'rd' },
  { label: '产品部', value: 'product' },
  { label: '设计部', value: 'design' },
]
</script>

<template>
  <ProForm v-model="formData" :items="items" :show-reset="false">
    <template #dept>
      <ElSelect v-model="formData.dept" placeholder="请选择部门" clearable>
        <ElOption v-for="dept in departments" :key="dept.value" v-bind="dept" />
      </ElSelect>
    </template>
  </ProForm>
</template>
