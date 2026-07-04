<script setup lang="ts">
import { elementPlusConfig } from '../config/element-plus'

interface MenuItem {
  path: string
  label: string
}

const menuItems: MenuItem[] = [
  { path: '/', label: '组件测试' },
  { path: '/directives', label: '指令' },
  { path: '/hooks', label: 'Hooks' },
]

const route = useRoute()

const activeMenu = computed(() => route.path)
</script>

<template>
  <el-config-provider
    :locale="elementPlusConfig.locale"
    :size="elementPlusConfig.size"
  >
    <div class="app-shell">
      <el-container class="app-container">
        <el-aside class="app-aside">
          <div class="app-brand">
            <span class="app-brand__mark">F</span>
            <span class="app-brand__name">FireflyMIT</span>
          </div>
          <el-menu
            :default-active="activeMenu"
            class="app-menu"
            router
          >
            <el-menu-item
              v-for="item in menuItems"
              :key="item.path"
              :index="item.path"
            >
              {{ item.label }}
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-container class="app-body">
          <main class="app-main">
            <div class="app-view">
              <router-view v-slot="{ Component }">
                <keep-alive>
                  <component :is="Component" :key="route.fullPath" class="route-page" />
                </keep-alive>
              </router-view>
            </div>
          </main>
        </el-container>
      </el-container>
    </div>
  </el-config-provider>
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
    flex-direction: row;
    flex: 1;
    height: 100%;
    min-height: 0;
    overflow: hidden;
  }

  .app-aside {
    display: flex;
    flex: 0 0 220px;
    flex-direction: column;
    width: 220px;
    min-height: 0;
    flex-shrink: 0;
    border-right: 1px solid #e5e7eb;
    background-color: #fff;
    box-shadow: 1px 0 0 rgb(15 23 42 / 3%);
  }

  .app-brand {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 10px;
    height: 64px;
    padding: 0 18px;
    border-bottom: 1px solid #eef2f7;

    .app-brand__mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background-color: var(--el-color-primary);
      color: var(--el-color-white);
      font-size: 16px;
      font-weight: 700;
      line-height: 1;
    }

    .app-brand__name {
      min-width: 0;
      color: #111827;
      font-size: 16px;
      font-weight: 700;
      line-height: 1.4;
      white-space: nowrap;
    }
  }

  .app-menu {
    flex: 1;
    min-height: 0;
    border-right: 0;
    padding: 10px;

    .el-menu-item {
      height: 42px;
      margin-bottom: 4px;
      border-radius: 8px;
      color: var(--el-text-color-regular);
      font-size: 15px;
      font-weight: 500;
      line-height: 42px;

      &:hover {
        background-color: var(--el-fill-color-light);
        color: var(--el-text-color-primary);
      }

      &.is-active {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
        font-weight: 700;
      }
    }
  }

  .app-body {
    display: flex;
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
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

@media (width <= 768px) {
  .app-shell {
    .app-aside {
      flex-basis: 176px;
      width: 176px;
    }

    .app-brand {
      height: 56px;
      padding: 0 12px;

      .app-brand__mark {
        width: 28px;
        height: 28px;
        border-radius: 7px;
        font-size: 14px;
      }

      .app-brand__name {
        font-size: 14px;
      }
    }

    .app-menu {
      padding: 8px;

      .el-menu-item {
        height: 40px;
        padding: 0 12px;
        font-size: 14px;
        line-height: 40px;
      }
    }
  }
}
</style>
