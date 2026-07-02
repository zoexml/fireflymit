<script setup lang="ts">
import bannerCover from '@imgs/login/lf_icon2.webp'
import { useSettingsStore, useUserStore } from '@stores'
import { greetings } from '@utils'
import { computed } from 'vue'

const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { isDark } = storeToRefs(settingsStore)

const userInfo = computed(() => userStore.basicInfo)

const handleBannerClick = (): void => {
  // TODO: 接入真实跳转或路由
}

const timefix = greetings()
const welcome = '祝你开心每一天！'
const currentUser = {
  avatar: userStore.basicInfo.avatar || '',
  name: userInfo.value.name || '吴彦祖',
  username: userInfo.value.username || '账号信息',
  description: userInfo.value.description || '用户说明',
  dept_name: userInfo.value.dept_name || '软件专业部',
  last_login: userInfo.value.last_login || '2023-01-01 00:00:00',
}

const bannerTitle = `欢迎回来 ～ ${currentUser.name}（${currentUser.username}） ${timefix} ${welcome}`

const bannerSubtitle = `基于 FastAPI + Vue3 + TypeScript 构建的企业级中后台解决方案，支持多端开发。`
</script>

<template>
  <FBanner
    class="justify-center h-54! max-sm:h-48! max-sm:pt-8!"
    :title="bannerTitle"
    :subtitle="bannerSubtitle"
    boxStyle="bg-theme/10!"
    titleColor="var(--fa-gray-900)"
    subtitleColor="var(--fa-gray-500)"
    :decoration="false"
    :dark="isDark"
    :meteorConfig="{
      enabled: true,
      count: 10,
    }"
    :buttonConfig="{
      show: false,
      text: '开始探索',
      color: 'var(--fa-success)',
      textColor: '#fff',
      radius: '6px',
    }"
    :imageConfig="{
      src: bannerCover,
      width: '18rem',
      bottom: '-7.5rem',
    }"
    @click="handleBannerClick"
  >
    <div class="mt-2 flex items-center gap-4">
      <FAvatar
        :src="currentUser.avatar"
        :name="currentUser.name"
        :size="80"
        shape="circle"
        style="background-color: transparent"
      />
      <div>
        <div class="text-g-800 text-lg font-semibold">
          {{ currentUser.name }}
        </div>
        <div class="text-g-600 text-sm">
          {{ currentUser.dept_name }} · {{ currentUser.description }} · {{ currentUser.last_login }}
        </div>
      </div>
    </div>
  </FBanner>
</template>

<style scoped lang="scss"></style>
