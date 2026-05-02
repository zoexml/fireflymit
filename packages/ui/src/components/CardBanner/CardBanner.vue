<!-- 卡片横幅组件 -->
<script setup lang="ts">
import { cardBannerProps } from './CardBanner.types'

defineOptions({ name: 'CardBanner' })

const props = defineProps(cardBannerProps)

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'cancel'): void
}>()

const handleClick = () => {
  emit('click')
}

const handleCancel = () => {
  emit('cancel')
}
</script>

<template>
  <div class="art-card-banner" :style="{ height }">
    <div class="art-card-banner__inner">
      <div v-if="image" class="art-card-banner__image">
        <img :src="image" :alt="title">
      </div>
      <div class="art-card-banner__text">
        <p class="art-card-banner__title">
          {{ title }}
        </p>
        <p class="art-card-banner__desc">
          {{ description }}
        </p>
      </div>
      <div class="art-card-banner__actions">
        <div
          v-if="cancelButton?.show"
          class="art-card-banner__cancel-btn"
          :style="{
            backgroundColor: cancelButton?.color,
            color: cancelButton?.textColor,
          }"
          @click="handleCancel"
        >
          {{ cancelButton?.text }}
        </div>
        <div
          v-if="button?.show"
          class="art-card-banner__btn"
          :style="{ backgroundColor: button?.color, color: button?.textColor }"
          @click="handleClick"
        >
          {{ button?.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.art-card-banner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 1.5rem;
  background: var(--el-bg-color, #fff);
  border-radius: calc(var(--custom-radius, 4px) + 2px);

  &__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  &__image {
    width: 11.25rem;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__text {
    box-sizing: border-box;
    padding: 0 1rem;
  }

  &__title {
    margin: 0 0 0.5rem;
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--el-text-color-primary, #303133);
  }

  &__desc {
    margin: 0;
    font-size: 0.875rem;
    color: var(--el-text-color-secondary, #909399);
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__btn,
  &__cancel-btn {
    display: inline-block;
    height: 2.25rem;
    padding: 0 0.75rem;
    font-size: 0.875rem;
    line-height: 2.25rem;
    cursor: pointer;
    user-select: none;
    border-radius: 6px;
    transition: all 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }

  &__cancel-btn {
    border: 1px solid var(--el-border-color, #dcdfe6);
  }
}
</style>
