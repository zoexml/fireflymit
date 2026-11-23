<script setup lang="ts">
import type { MenuItemType } from '@fireflymit/ui'
import { ContextMenu } from '@fireflymit/ui'
import { ref } from 'vue'

const menuRef = ref<{ show: (event: MouseEvent) => void } | null>(null)
const selected = ref('')

const menuItems: MenuItemType[] = [
  { key: 'copy', label: '复制', showLine: true },
  { key: 'rename', label: '重命名' },
  {
    key: 'move',
    label: '移动到',
    children: [
      { key: 'inbox', label: '收件箱' },
      { key: 'archive', label: '归档' },
    ],
  },
  { key: 'delete', label: '删除', disabled: true },
]

function openMenu(event: MouseEvent) {
  menuRef.value?.show(event)
}

function handleSelect(item: MenuItemType) {
  selected.value = `选中：${item.label}（${item.key}）`
}
</script>

<template>
  <div class="context-menu-demo">
    <div class="context-menu-demo__area" @contextmenu.prevent="openMenu">
      在此区域内点击鼠标右键
    </div>
    <p class="context-menu-demo__info">
      {{ selected || '选择菜单项后在这里显示结果' }}
    </p>

    <ContextMenu
      ref="menuRef"
      :menu-items="menuItems"
      @select="handleSelect"
    />
  </div>
</template>

<style scoped>
.context-menu-demo__area {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  user-select: none;
  background: var(--vp-c-bg-alt);
  border: 1px dashed var(--vp-c-divider);
  border-radius: 8px;
}

.context-menu-demo__info {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
