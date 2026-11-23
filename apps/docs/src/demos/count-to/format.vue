<script setup lang="ts">
import { CountTo } from '@fireflymit/ui'
</script>

<template>
  <div class="count-to-format">
    <p class="count-to-format__item">
      金额：
      <CountTo
        :target="1234567.891"
        :decimals="2"
        separator=","
        decimal="."
        prefix="¥"
        :duration="1800"
      />
    </p>
    <p class="count-to-format__item">
      完成度：
      <CountTo
        :target="99.5"
        :decimals="1"
        suffix="%"
        :duration="1200"
        easing="easeOutBack"
      />
    </p>
    <p class="count-to-format__item">
      关闭动画：
      <CountTo :target="8080" :disabled="true" />
    </p>
  </div>
</template>

<style scoped>
.count-to-format__item {
  margin: 0 0 12px;
  font-size: 14px;
}

.count-to-format__item:last-child {
  margin-bottom: 0;
}
</style>
