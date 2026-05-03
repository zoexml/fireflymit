<script setup lang="ts">
import { Banner, CardBanner } from '@fireflymit/ui'
import { ElMessage } from 'element-plus'

const handleBannerClick = (text: string) => {
  ElMessage.success(`点击了: ${text}`)
}

const bannerBaseBg = 'background: linear-gradient(135deg, #409eff 0%, #337ecc 100%)'
const bannerCyanBg = 'background: #D4F1F7'
const bannerPinkBg = 'background: #FF8AAB'
const bannerDarkBg = 'background: #1a1a2e'
const bannerBlueBg = 'background: #70B1FF'
const bannerPurpleBg = 'background: #e0e0f0'

const bannerImg = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMTUwIiB2aWV3Qm94PSIwIDAgMjAwIDE1MCI+PHJlY3QgZmlsbD0iI2UwZTBmMCIgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIHJ4PSI4Ii8+PGNpcmNsZSBjeD0iMTAwIiBjeT0iNjAiIHI9IjIwIiBmaWxsPSIjYjNiN2ViIi8+PHBhdGggZD0iTTAgMTIwbDUwLTQwIDMwIDIwIDQwLTMwIDgwIDYwSDB6IiBmaWxsPSIjYjNiN2ViIi8+PC9zdmc+'
</script>

<template>
  <div class="max-w-3xl w-full space-y-6">
    <div>
      <h3 class="mb-3 text-base font-medium">
        基础用法
      </h3>
      <div class="overflow-hidden rounded-lg" :style="bannerBaseBg">
        <Banner title="Art Design Pro" subtitle="一款兼具设计美学与高效开发的后台系统" @click="handleBannerClick('基础用法')" />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        自定义颜色
      </h3>
      <div class="overflow-hidden rounded-lg" :style="bannerCyanBg">
        <Banner
          title="自定义颜色" subtitle="支持自定义标题、副标题和按钮颜色" title-color="#333" subtitle-color="#666" :button-config="{
            show: true,
            text: '立即体验',
            color: '#67c23a',
            textColor: '#fff',
          }" @click="handleBannerClick('自定义颜色')"
        />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        按钮配置
      </h3>
      <div class="overflow-hidden rounded-lg" :style="bannerPinkBg">
        <Banner
          title="按钮自定义" subtitle="可以自定义按钮文本和样式" :button-config="{
            show: true,
            text: '了解更多',
            color: '#FF5A89',
            textColor: '#fff',
            radius: '8px',
          }" @click="handleBannerClick('按钮配置')"
        />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        流星效果
      </h3>
      <div class="overflow-hidden rounded-lg" :style="bannerDarkBg">
        <Banner title="流星动画" subtitle="背景带有流星动画装饰效果" :meteor-config="{ enabled: true, count: 15 }" dark @click="handleBannerClick('流星效果')" />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        图片配置
      </h3>
      <div class="overflow-hidden rounded-lg" :style="bannerBlueBg">
        <Banner
          title="探索星空计划" subtitle="加入我们的天文观测活动，发现宇宙的奥秘" :image-config="{
            src: bannerImg,
            width: '10rem',
            bottom: '-2rem',
            right: '2rem',
          }" @click="handleBannerClick('图片配置')"
        />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        简洁模式
      </h3>
      <div class="overflow-hidden rounded-lg" :style="bannerPurpleBg">
        <Banner title="简洁模式" subtitle="关闭装饰效果的纯色横幅" :decoration="false" @click="handleBannerClick('简洁模式')" />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        CardBanner 基础用法
      </h3>
      <div class="rounded-xl bg-gray-50 p-6">
        <CardBanner title="卡片横幅" description="这是一款卡片样式的横幅组件，支持标题和描述展示" @click="handleBannerClick('CardBanner基础')" />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        CardBanner 按钮配置
      </h3>
      <div class="rounded-xl bg-gray-50 p-6">
        <CardBanner
          title="自定义按钮" description="支持主按钮和取消按钮的配置" :button="{
            show: true,
            text: '查看详情',
            color: '#67c23a',
            textColor: '#fff',
          }" :cancel-button="{
            show: true,
            text: '稍后再说',
            color: '#f5f5f5',
            textColor: '#666',
          }" @click="handleBannerClick('CardBanner按钮')"
        />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        CardBanner 带图片
      </h3>
      <div class="rounded-xl bg-gray-50 p-6">
        <CardBanner title="图片卡片" description="带有背景图片的卡片横幅组件" :image="bannerImg" @click="handleBannerClick('CardBanner图片')" />
      </div>
    </div>
  </div>
</template>
