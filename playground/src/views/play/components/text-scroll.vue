<script setup lang="ts">
import { TextScroll } from '@fireflymit/ui'
import { ElMessage } from 'element-plus'

const handleTextScrollClose = () => {
  ElMessage.info('已关闭')
}
</script>

<template>
  <div class="max-w-3xl w-full space-y-4">
    <TextScroll text="Art Design Pro 是一款兼具设计美学与高效开发的后台系统" showClose />
    <TextScroll type="success" text="这是一条成功类型的滚动公告" />
    <TextScroll type="warning" text="这是一条警告类型的滚动公告" />
    <TextScroll type="danger" text="这是一条危险类型的滚动公告" />
    <TextScroll type="info" text="这是一条信息类型的滚动公告" />
    <TextScroll text="这是一条可关闭的滚动公告" @close="handleTextScrollClose" />
    <TextScroll type="warning" text="这是一条速度较慢、向右滚动的公告" :speed="30" direction="right" />
    <TextScroll text="这是一条文字溢出才会滚动的公告，当文本内容超出容器宽度时才会开始滚动" :alwaysScroll="false" @close="handleTextScrollClose" />
    <TextScroll type="danger" direction="up" :speed="30" text="这是一条向上滚动的公告" />
    <TextScroll type="info" direction="down" :speed="30" text="这是一条向下滚动的公告" />
  </div>
</template>
