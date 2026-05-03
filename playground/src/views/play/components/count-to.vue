<script setup lang="ts">
import { CountTo } from '@fireflymit/ui'
import { ref } from 'vue'

const demoBox = 'p-5 mb-4 text-2xl font-semibold text-center bg-gray-50 rounded-lg tabular-nums border border-gray-200'

const countToRef = ref()
const controlTarget = ref(0)
const easingTarget = ref(0)

const easingTypes = [
  { name: 'Linear', type: 'linear' },
  { name: 'Ease Out Cubic', type: 'easeOutCubic' },
  { name: 'Ease Out Expo', type: 'easeOutExpo' },
  { name: 'Ease Out Sine', type: 'easeOutSine' },
  { name: 'Ease In Out', type: 'easeInOutCubic' },
  { name: 'Ease In Quad', type: 'easeInQuad' },
] as const

const startCount = () => {
  controlTarget.value = 5000
  countToRef.value?.start(5000)
}

const pauseCount = () => {
  countToRef.value?.pause()
}

const resetCount = () => {
  countToRef.value?.reset()
  controlTarget.value = 0
}

const triggerEasing = () => {
  easingTarget.value = easingTarget.value === 0 ? 1000 : 0
}
</script>

<template>
  <div class="max-w-3xl w-full">
    <div class="mb-6">
      <h3 class="mb-3 text-base font-medium">
        基础用法
      </h3>
      <div :class="demoBox">
        <CountTo :target="1000" :duration="2000" />
      </div>
    </div>

    <div class="mb-6">
      <h3 class="mb-3 text-base font-medium">
        带前缀后缀
      </h3>
      <div :class="demoBox">
        <CountTo :target="20000" :duration="2500" prefix="¥" suffix="元" :decimals="2" />
      </div>
    </div>

    <div class="mb-6">
      <h3 class="mb-3 text-base font-medium">
        千分位分隔符
      </h3>
      <div :class="demoBox">
        <CountTo :target="2023.45" :duration="3000" :decimals="2" separator="," />
      </div>
    </div>

    <div class="mb-6">
      <h3 class="mb-3 text-base font-medium">
        动画效果对比
      </h3>
      <div class="grid grid-cols-3 mb-4 gap-3">
        <div v-for="easing in easingTypes" :key="easing.type" class="text-center">
          <div class="mb-1 text-xs text-gray-500">
            {{ easing.name }}
          </div>
          <div :class="demoBox">
            <CountTo :target="easingTarget" :duration="3000" :easing="easing.type" />
          </div>
        </div>
      </div>
      <div class="text-center">
        <el-button size="small" @click="triggerEasing">
          触发所有动画
        </el-button>
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-base font-medium">
        控制按钮
      </h3>
      <div :class="demoBox">
        <CountTo ref="countToRef" :target="controlTarget" :duration="2000" />
      </div>
      <div class="flex justify-center gap-3">
        <el-button size="small" @click="startCount">
          开始
        </el-button>
        <el-button size="small" @click="pauseCount">
          暂停
        </el-button>
        <el-button size="small" @click="resetCount">
          重置
        </el-button>
      </div>
    </div>
  </div>
</template>
