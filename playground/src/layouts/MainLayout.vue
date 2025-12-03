<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { routes } from '@/router'

const collapsed = ref<boolean>(false)
const selectedKeys = ref<string[]>(['/ui'])
const router = useRouter()

const pageTitle = computed(() => {
  return `${routes.find(item => item.path === selectedKeys.value[0])?.meta?.title}演示`
})

const onMenuSelect = (key: string) => {
  router.push(key)
}
</script>

<template>
  <el-container style="min-height: 100vh">
    <!-- 侧边栏 -->
    <el-aside :width="collapsed ? '64px' : '200px'">
      <div class="logo" />

      <el-menu
        :default-active="selectedKeys[0]"
        class="el-menu-vertical"
        :collapse="collapsed"
        @select="onMenuSelect"
      >
        <el-menu-item
          v-for="route in routes"
          :key="route.path"
          :index="route.path"
        >
          <template #title>
            <component :is="route.meta.icon" v-if="route.meta?.icon" />
            <span>{{ route.meta?.title }}</span>
          </template>
        </el-menu-item>
      </el-menu>

      <div class="collapse-btn">
        <el-button text @click="collapsed = !collapsed">
          {{ collapsed ? '展开' : '折叠' }}
        </el-button>
      </div>
    </el-aside>

    <!-- 右侧内容 -->
    <el-container>
      <el-header>
        <h2>{{ pageTitle }}</h2>
      </el-header>

      <el-main>
        <el-card shadow="never">
          <router-view />
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  margin: 16px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: rgb(255 255 255 / 30%);
}
</style>
