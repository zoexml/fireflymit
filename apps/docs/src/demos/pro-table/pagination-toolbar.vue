<script setup lang="ts">
import type { ProTableColumn, ProTablePaginationChange } from '@fireflymit/ui'
import { ProTable } from '@fireflymit/ui'
import { ElButton } from 'element-plus'
import { ref } from 'vue'

interface OrderRow {
  id: number
  orderNo: string
  amount: number
}

const columns: ProTableColumn<OrderRow>[] = [
  { prop: 'orderNo', label: '订单号', minWidth: 140 },
  {
    prop: 'amount',
    label: '金额',
    width: 120,
    formatter: row => `¥${row.amount.toFixed(2)}`,
  },
]

const data: OrderRow[] = Array.from({ length: 23 }, (_, index) => ({
  id: index + 1,
  orderNo: `FFM-${String(index + 1).padStart(4, '0')}`,
  amount: 100 + index * 12.5,
}))

const pageInfo = ref('第 1 页')

function handlePaginationChange(payload: ProTablePaginationChange) {
  pageInfo.value = `第 ${payload.currentPage} 页，每页 ${payload.pageSize} 条`
}
</script>

<template>
  <div class="pro-table-demo">
    <ProTable
      header-title="订单列表"
      :columns="columns"
      :data="data"
      :options="{ reload: true, density: true, setting: true }"
      :pagination="{ pageSize: 10 }"
      @pagination-change="handlePaginationChange"
    >
      <template #toolbar>
        <ElButton type="primary" size="small">
          新建订单
        </ElButton>
      </template>
    </ProTable>
    <p class="pro-table-demo__info">
      {{ pageInfo }}
    </p>
  </div>
</template>

<style scoped>
.pro-table-demo__info {
  margin: 12px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
