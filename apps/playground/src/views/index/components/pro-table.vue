<script setup lang="tsx">
import type {
  ProTableColumn,
  ProTableColumnsStateMap,
  ProTablePaginationConfig,
  ProTableToolbarOptions,
} from '@fireflymit/ui'
import { Badge, ProTable } from '@fireflymit/ui'
import { ElButton } from 'element-plus'
import { computed, shallowRef } from 'vue'

interface UserRow {
  id: number
  name: string
  role: string
  status: 'enabled' | 'disabled'
  score: number
  city: string
}

type ToolbarTool = 'reload' | 'density' | 'setting'

const tableRows: UserRow[] = Array.from({ length: 28 }, (_, index) => {
  const id = index + 1
  const enabled = id % 4 !== 0

  return {
    id,
    name: `用户 ${id}`,
    role: id % 3 === 0 ? '运营' : id % 3 === 1 ? '研发' : '设计',
    status: enabled ? 'enabled' : 'disabled',
    score: 72 + (id % 9) * 3,
    city: ['上海', '杭州', '深圳', '北京'][index % 4],
  }
})

const selectedRow = shallowRef<UserRow | null>(null)
const paginationEnabled = shallowRef(true)
const fullHeight = shallowRef(true)
const toolbarVisible = shallowRef(true)
const toolbarTools = shallowRef<ToolbarTool[]>(['reload', 'density', 'setting'])
const currentPage = shallowRef(1)
const pageSize = shallowRef(20)
const columnsState = shallowRef<ProTableColumnsStateMap>({
  city: { show: true },
})

const paginationOptions = [
  { label: '分页', value: true },
  { label: '不分页', value: false },
]

const heightOptions = [
  { label: '撑满高度', value: true },
  { label: '自适应高度', value: false },
]

const toolbarToolOptions: Array<{ label: string, value: ToolbarTool }> = [
  { label: '刷新', value: 'reload' },
  { label: '密度', value: 'density' },
  { label: '列设置', value: 'setting' },
]

const pagination = computed<ProTablePaginationConfig>(() => {
  if (!paginationEnabled.value) return false

  return {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    pageSizes: [20, 50, 100, 500],
    size: 'small',
  }
})

const tableHeight = computed(() => (fullHeight.value ? '100%' : undefined))
const toolbarButtonText = computed(() => (toolbarVisible.value ? '隐藏工具栏' : '显示工具栏'))
const toolbarOptions = computed<ProTableToolbarOptions | false>(() => {
  if (!toolbarVisible.value) return false

  return {
    reload: toolbarTools.value.includes('reload'),
    density: toolbarTools.value.includes('density'),
    setting: toolbarTools.value.includes('setting'),
  }
})

const handleColumnsStateChange = (value: ProTableColumnsStateMap) => {
  columnsState.value = value
}

const toggleToolbar = () => {
  toolbarVisible.value = !toolbarVisible.value
}

const columns: ProTableColumn<UserRow>[] = [
  { type: 'index', label: '#', width: 64, align: 'center' },
  { prop: 'name', label: '姓名', minWidth: 120 },
  { prop: 'role', label: '角色', minWidth: 120 },
  {
    prop: 'status',
    label: '状态',
    width: 120,
    render: ({ row }) => (
      <Badge type={row.status === 'enabled' ? 'success' : 'info'} text={row.status === 'enabled' ? '启用' : '停用'} />
    ),
  },
  {
    prop: 'score',
    label: '评分',
    width: 120,
    align: 'right',
    render: ({ value }) => <strong>{value as number}</strong>,
  },
  { prop: 'city', label: '城市', minWidth: 120 },
  {
    key: 'actions',
    label: '操作',
    width: 120,
    fixed: 'right',
    render: ({ row }) => (
      <ElButton link type="primary" onClick={() => (selectedRow.value = row)}>
        查看
      </ElButton>
    ),
  },
]
</script>

<template>
  <div class="pro-table-demo" :class="{ 'pro-table-demo--full': fullHeight }">
    <div class="pro-table-demo__toolbar">
      <div class="pro-table-demo__toolbar-left">
        <el-radio-group v-model="paginationEnabled" size="small">
          <el-radio-button v-for="item in paginationOptions" :key="String(item.value)" :value="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>

        <ElButton size="small" @click="toggleToolbar">
          {{ toolbarButtonText }}
        </ElButton>

        <el-checkbox-group v-model="toolbarTools" size="small">
          <el-checkbox-button v-for="item in toolbarToolOptions" :key="item.value" :value="item.value">
            {{ item.label }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>

      <div class="pro-table-demo__toolbar-right">
        <el-radio-group v-model="fullHeight" size="small">
          <el-radio-button v-for="item in heightOptions" :key="String(item.value)" :value="item.value">
            {{ item.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <section class="pro-table-demo__section">
      <ProTable
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        stripe border
        :header-title="toolbarVisible ? '用户列表' : ''"
        :columns="columns"
        :data="tableRows"
        :height="tableHeight"
        :options="toolbarOptions"
        :columns-state="toolbarVisible
          ? {
            value: columnsState,
            persistenceKey: 'playground-pro-table-columns',
          }
          : undefined"
        :pagination="pagination"
        @columns-state-change="handleColumnsStateChange"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.pro-table-demo {
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-height: 0;
  width: 100%;

  &--full {
    flex: 1;
    height: 100%;
  }

  &__toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  &__toolbar-left,
  &__toolbar-right {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
  }

  &__toolbar-left {
    min-width: 0;
  }

  &__toolbar-right {
    margin-left: auto;
  }

  &__section {
    min-height: 0;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  &--full {
    .pro-table-demo__section {
      flex: 1;
    }
  }
}

@media (width <= 768px) {
  .pro-table-demo {
    &__toolbar {
      overflow-x: auto;
    }

    &__toolbar-right {
      margin-left: 0;
    }
  }
}
</style>
