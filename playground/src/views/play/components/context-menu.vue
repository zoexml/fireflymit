<script setup lang="ts">
import { ContextMenu } from '@fireflymit/ui'
import { ElMessage } from 'element-plus'
import { nextTick, ref } from 'vue'

const menuRef = ref<InstanceType<typeof ContextMenu>>()
const lastAction = ref('')

const menuItems = ref([
  { key: 'copy', label: '复制', icon: 'ri:file-copy-line' },
  { key: 'paste', label: '粘贴', icon: 'ri:capsule-line' },
  { key: 'cut', label: '剪切', icon: 'ri:clipboard-line', showLine: true },
  {
    key: 'export',
    label: '导出选项',
    icon: 'ri:export-line',
    children: [
      { key: 'exportExcel', label: '导出 Excel', icon: 'ri:file-excel-2-line' },
      { key: 'exportPdf', label: '导出 PDF', icon: 'ri:file-pdf-2-line' },
    ],
  },
  {
    key: 'edit',
    label: '编辑选项',
    icon: 'ri:edit-2-line',
    children: [
      { key: 'rename', label: '重命名' },
      { key: 'duplicate', label: '复制副本' },
    ],
  },
  { key: 'share', label: '分享', icon: 'ri:share-forward-line', showLine: true },
  { key: 'delete', label: '删除', icon: 'ri:delete-bin-line' },
  { key: 'disabled', label: '禁用选项', icon: 'ri:close-circle-line', disabled: true },
])

const handleSelect = (item: any) => {
  lastAction.value = `${item.label} (${item.key})`
  ElMessage.success(`执行操作: ${item.label}`)
}

const showMenu = (e: MouseEvent) => {
  e.preventDefault()
  e.stopPropagation()
  nextTick(() => {
    menuRef.value?.show(e)
  })
}
</script>

<template>
  <div class="max-w-lg w-full">
    <el-button @contextmenu.prevent="showMenu">
      右键触发菜单
    </el-button>
    <p class="mt-4 text-sm text-gray-500">
      最后操作: {{ lastAction || '无' }}
    </p>
    <ContextMenu ref="menuRef" :menu-items="menuItems" :menu-width="180" :submenu-width="140" :border-radius="10" @select="handleSelect" />
  </div>
</template>
