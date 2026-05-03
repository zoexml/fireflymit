<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface MenuItem {
  name: string
  path: string
  label: string
}

const menuItems: MenuItem[] = [
  { name: 'Play', path: '/', label: '组件测试' },
  { name: 'Hooks', path: '/hooks', label: 'Hooks' },
]

const router = useRouter()
const route = useRoute()

const activeMenu = computed(() => menuItems.find(item => route.path === item.path)?.name ?? '')

const handleMenuSelect = (name: string) => {
  const item = menuItems.find(item => item.name === name)
  if (item) router.push(item.path)
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="flex items-center p-0">
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          :ellipsis="false"
          class="w-full border-0"
          @select="handleMenuSelect"
        >
          <el-menu-item
            v-for="item in menuItems"
            :key="item.name"
            :index="item.name"
            :name="item.name"
          >
            {{ item.label }}
          </el-menu-item>
        </el-menu>
      </el-header>
      <el-container>
        <el-main>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.common-layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.el-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.el-header {
  flex-shrink: 0;
}
.el-main {
  flex: 1;
  padding: 0;
  overflow: hidden;
}
</style>

<style scoped>
.el-menu--horizontal .el-menu-item {
  font-size: 1.125rem;
  font-weight: 600;
}
</style>
