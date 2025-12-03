<script setup lang="ts">
interface Props {
  name: string
}

const props = defineProps<Props>()

// 当前tab索引
const activeKey = ref(0)

// 动态加载 views 下所有演示组件
const components = import.meta.glob('../views/**/**.vue', {
  eager: true,
  import: 'default',
})

// 根据文件路径筛选组件
const renderCmp = Object.entries(components)
  .filter(([path]) =>
    path.includes(`/${props.name.charAt(0).toUpperCase() + props.name.slice(1)}/`),
  )
  .map(([path, component], index) => {
    const name = path.match(/[^/]+(?=\.vue$)/)?.[0] || 'error'
    return {
      name,
      component,
      index,
    }
  })
</script>

<template>
  <div :class="`${name}-demo`">
    <el-tabs v-model="activeKey" type="card">
      <el-tab-pane
        v-for="item in renderCmp"
        :key="item.index"
        :label="item.name"
        :name="item.index"
      />
    </el-tabs>

    <component :is="renderCmp[activeKey]?.component" />
  </div>
</template>
