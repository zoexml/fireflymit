<script setup lang="ts">
import { ref } from 'vue'
import { componentMap, components } from './components'

const activeComponent = ref(components[0].value)
</script>

<template>
  <div class="page-layout">
    <!-- 组件切换 -->
    <div class="toolbar flex flex-wrap gap-2 rounded-lg bg-gray-100 p-3">
      <el-radio-group v-model="activeComponent" size="small">
        <el-radio-button v-for="item in components" :key="item.value" :value="item.value">
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="content-area">
      <el-scrollbar class="content-scrollbar" height="100%" view-class="content-scroll">
        <component :is="componentMap[activeComponent as keyof typeof componentMap]" v-if="activeComponent" />
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;

  .toolbar {
    flex-shrink: 0;
  }

  .content-area {
    flex: 1;
    min-height: 0;
    min-width: 0;
    overflow: hidden;

    .content-scrollbar {
      height: 100%;
      min-height: 0;
      min-width: 0;

      :deep(.el-scrollbar__wrap) {
        overscroll-behavior: contain;
      }

      :deep(.content-scroll) {
        display: flex;
        min-height: 0;
        height: 100%;
        padding: 0 4px 4px;
        box-sizing: border-box;
      }
    }
  }
}
</style>
