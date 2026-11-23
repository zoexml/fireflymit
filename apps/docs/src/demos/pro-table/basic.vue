<script setup lang="ts">
import type { ProTableColumn } from '@fireflymit/ui'
import { ProTable } from '@fireflymit/ui'

interface UserRow {
  id: number
  name: string
  role: string
  status: string
}

const columns: ProTableColumn<UserRow>[] = [
  { prop: 'name', label: '姓名', minWidth: 120 },
  { prop: 'role', label: '角色', minWidth: 120 },
  {
    prop: 'status',
    label: '状态',
    width: 100,
    formatter: row => (row.status === 'enabled' ? '启用' : '停用'),
  },
]

const data: UserRow[] = [
  { id: 1, name: '张三', role: '管理员', status: 'enabled' },
  { id: 2, name: '李四', role: '编辑', status: 'disabled' },
  { id: 3, name: '王五', role: '访客', status: 'enabled' },
]
</script>

<template>
  <ProTable :columns="columns" :data="data" />
</template>
