<script setup lang="ts">
import {
  useLockScroll,
  vClickOutside,
  vCopy,
  vDebounce,
  vEmoji,
  vInput,
  vLazyLoad,
  vLongpress,
  vRipple,
  vThrottle,
} from '@fireflymit/ui'
import { ElMessage } from 'element-plus'

const message = (text: string) => ElMessage.success(text)

// --- vCopy ---
const copyText = ref('要复制的文本内容')

// --- vLongpress ---
const longpressDuration = ref(1000)
const onLongpress = () => message(`长按 ${longpressDuration.value}ms 触发`)

// --- vDebounce ---
const debounceCount = ref(0)
const onDebounce = () => {
  debounceCount.value++
  message(`防抖点击: ${debounceCount.value}`)
}

// --- vThrottle ---
const throttleCount = ref(0)
const onThrottle = () => {
  throttleCount.value++
  message(`节流点击: ${throttleCount.value}`)
}

// --- vInput ---
const inputNumber = ref('')
const inputDecimal = ref('')
const inputDecimal2 = ref('')
const inputCustomize = ref('')

// --- vRipple ---
const rippleColor = ref('rgba(59, 130, 246, 0.3)')

// --- vClickOutside ---
const showPanel = ref(false)

// --- useLockScroll ---
const locked = ref(false)
useLockScroll(locked)
</script>

<template>
  <div class="mx-auto max-w-5xl p-6 pb-16 space-y-6">
    <h1 class="text-2xl font-bold">
      Directives & Hooks
    </h1>

    <div class="grid gap-4" style="grid-template-columns: repeat(auto-fill, minmax(400px, 1fr))">
      <!-- vCopy -->
      <el-card header="v-copy" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          点击按钮将文本写入剪贴板
        </p>
        <el-input
          v-model="copyText"
          :maxlength="20"
          show-word-limit
          class="mb-3"
        />
        <el-button v-copy="copyText" type="primary">
          点击复制
        </el-button>
      </el-card>

      <!-- vLongpress -->
      <el-card header="v-longpress" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          长按按钮触发回调（{{ longpressDuration }}ms）
        </p>
        <div class="mb-3 flex items-center gap-2">
          <span class="text-sm text-gray-400">时长:</span>
          <el-radio-group v-model="longpressDuration" size="small">
            <el-radio-button label="500" :value="500" />
            <el-radio-button label="1000" :value="1000" />
            <el-radio-button label="3000" :value="3000" />
          </el-radio-group>
        </div>
        <el-button v-longpress:[longpressDuration]="onLongpress" type="primary">
          长按我
        </el-button>
      </el-card>

      <!-- vDebounce -->
      <el-card header="v-debounce" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          防抖点击：快速多次点击只会触发最后一次 (1000ms)
        </p>
        <el-button
          v-debounce="{ callback: onDebounce, time: 1000 }"
          type="primary"
        >
          防抖按钮 ({{ debounceCount }})
        </el-button>
      </el-card>

      <!-- vThrottle -->
      <el-card header="v-throttle" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          节流点击：间隔 1000ms 内只触发一次
        </p>
        <el-button
          v-throttle="{ callback: onThrottle, time: 1000 }"
          type="primary"
        >
          节流按钮 ({{ throttleCount }})
        </el-button>
      </el-card>

      <!-- vClickOutside -->
      <el-card header="v-click-outside" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          点击面板外部区域关闭面板
        </p>
        <div class="relative inline-block">
          <el-button type="primary" @click="showPanel = !showPanel">
            {{ showPanel ? '收起' : '展开面板' }}
          </el-button>
          <div
            v-if="showPanel"
            v-click-outside="() => (showPanel = false)"
            class="absolute left-0 top-full z-10 mt-2 w-56 border rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
          >
            <p class="text-sm text-gray-500">
              点击面板外任意处可关闭
            </p>
          </div>
        </div>
      </el-card>

      <!-- vEmoji -->
      <el-card header="v-emoji" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          禁止输入 Emoji 表情和特殊字符
        </p>
        <input
          v-emoji
          placeholder="试试输入 emoji 😀"
          class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-blue-400"
        >
      </el-card>

      <!-- vInput -->
      <el-card header="v-input" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          限制输入类型：数字 / 小数 / 两位小数 / 自定义规则
        </p>
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <span class="w-16 text-xs text-gray-400">整数</span>
            <input
              v-model="inputNumber"
              v-input:number
              placeholder="只能输入整数"
              class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
          </div>
          <div class="flex items-center gap-2">
            <span class="w-16 text-xs text-gray-400">小数</span>
            <input
              v-model="inputDecimal"
              v-input:decimal
              placeholder="允许输入小数"
              class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
          </div>
          <div class="flex items-center gap-2">
            <span class="w-16 text-xs text-gray-400">两位小数</span>
            <input
              v-model="inputDecimal2"
              v-input:decimal_2
              placeholder="保留两位小数"
              class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
          </div>
          <div class="flex items-center gap-2">
            <span class="w-16 text-xs text-gray-400">自定义</span>
            <input
              v-model="inputCustomize"
              v-input:customize="/[^\d]/"
              placeholder="只允许数字"
              class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
          </div>
        </div>
      </el-card>

      <!-- vRipple -->
      <el-card header="v-ripple" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          点击后产生波纹扩散动画
        </p>
        <div class="mb-3 flex items-center gap-2">
          <span class="text-sm text-gray-400">颜色:</span>
          <el-radio-group v-model="rippleColor" size="small">
            <el-radio-button label="rgba(59, 130, 246, 0.3)" value="rgba(59, 130, 246, 0.3)">
              蓝
            </el-radio-button>
            <el-radio-button label="rgba(239, 68, 68, 0.3)" value="rgba(239, 68, 68, 0.3)">
              红
            </el-radio-button>
          </el-radio-group>
        </div>
        <el-button
          v-ripple="rippleColor"
          type="primary"
          class="h-12 w-full rounded-lg text-lg"
        >
          点击看波纹
        </el-button>
      </el-card>

      <!-- vLazyLoad -->
      <el-card header="v-lazy-load" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          滚动到可视区域时加载图片（下有占位空间）
        </p>
        <div class="h-64 overflow-y-auto border rounded p-3">
          <p class="mb-2 text-xs text-gray-400">
            向下滚动以加载图片
          </p>
          <div class="h-40" />
          <img
            v-lazy-load="{
              src: 'https://picsum.photos/400/200',
              callback: (el) => ElMessage.info('图片已加载'),
            }"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23e5e7eb' width='400' height='200'/%3E%3Ctext fill='%239ca3af' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ELoading...%3C/text%3E%3C/svg%3E"
            alt="lazy load demo"
            class="h-[200px] w-[400px] rounded object-cover"
          >
          <div class="h-40" />
        </div>
      </el-card>

      <!-- useLockScroll -->
      <el-card header="useLockScroll" shadow="hover">
        <p class="mb-3 text-sm text-gray-500">
          锁定 / 解锁页面滚动
        </p>
        <el-button
          :type="locked ? 'danger' : 'default'"
          @click="locked = !locked"
        >
          {{ locked ? '解锁滚动' : '锁定滚动' }}
        </el-button>
      </el-card>
    </div>
  </div>
</template>
