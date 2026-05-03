<script setup lang="ts">
import { ref } from 'vue'
import { componentMap, components } from './components'

const activeComponent = ref('Badge')
</script>

<template>
  <div class="page-layout h-full flex flex-col">
    <!-- 组件切换 -->
    <div class="z-10 mb-4 flex flex-wrap gap-2 rounded-lg bg-gray-100 p-3">
      <el-radio-group v-model="activeComponent" size="small">
        <el-radio-button v-for="item in components" :key="item.value" :value="item.value">
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="flex-1 overflow-y-auto px-4 pb-16">
      <component
        :is="componentMap[activeComponent as keyof typeof componentMap]"
        v-if="activeComponent"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
