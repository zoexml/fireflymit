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
  { name: 'Directives', path: '/directives', label: '指令' },
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
  <div class="app-shell">
    <el-container class="app-container">
      <el-header class="app-header flex items-center p-0">
        <el-menu
          :default-active="activeMenu"
          mode="horizontal"
          :ellipsis="false"
          class="app-menu w-full border-0"
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
      <main class="app-main">
        <div class="app-view">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" class="route-page" />
            </keep-alive>
          </router-view>
        </div>
      </main>
    </el-container>
  </div>
</template>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  flex: 1;

  .app-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  .app-header {
    flex-shrink: 0;
    border-bottom: 1px solid #e5e7eb;
    background-color: #fff;

    .app-menu {
      min-width: 0;
    }
  }

  .app-main {
    display: flex;
    flex: 1;
    min-height: 0;
    padding: 0;
    overflow: hidden;

    .app-view {
      display: flex;
      flex: 1;
      min-height: 0;
      min-width: 0;
      overflow: hidden;

      .route-page {
        flex: 1;
        min-height: 0;
        min-width: 0;
        overflow: hidden;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.el-menu--horizontal {
  .el-menu-item {
    font-size: 1.125rem;
    font-weight: 600;
  }
}
</style>
