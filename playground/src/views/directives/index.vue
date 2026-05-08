<script setup lang="ts">
import { vClickOutside, vCopy, vDebounce, vEmoji, vInput, vLazyLoad, vLongpress, vRipple, vThrottle } from '@fireflymit/hooks'
import { ElMessage } from 'element-plus'

type DirectiveDemo
  = | 'v-copy'
    | 'v-longpress'
    | 'v-debounce'
    | 'v-throttle'
    | 'v-click-outside'
    | 'v-emoji'
    | 'v-input'
    | 'v-ripple'
    | 'v-lazy-load'

const demos = [
  { label: 'Copy', value: 'v-copy' },
  { label: 'Longpress', value: 'v-longpress' },
  { label: 'Debounce', value: 'v-debounce' },
  { label: 'Throttle', value: 'v-throttle' },
  { label: 'ClickOutside', value: 'v-click-outside' },
  { label: 'Emoji', value: 'v-emoji' },
  { label: 'Input', value: 'v-input' },
  { label: 'Ripple', value: 'v-ripple' },
  { label: 'LazyLoad', value: 'v-lazy-load' },
] as const satisfies ReadonlyArray<{ label: string, value: DirectiveDemo }>

const activeDemo = ref<DirectiveDemo>('v-copy')
const message = (text: string) => ElMessage.success(text)

const copyText = ref('要复制的文本内容')
const longpressDuration = ref(1000)
const onLongpress = () => message(`长按 ${longpressDuration.value}ms 触发`)

const debounceCount = ref(0)
const onDebounce = () => {
  debounceCount.value++
  message(`防抖点击: ${debounceCount.value}`)
}

const throttleCount = ref(0)
const onThrottle = () => {
  throttleCount.value++
  message(`节流点击: ${throttleCount.value}`)
}

const inputNumber = ref('')
const inputDecimal = ref('')
const inputDecimal2 = ref('')
const inputCustomize = ref('')

const rippleColor = ref('rgba(59, 130, 246, 0.3)')
const showPanel = ref(false)
</script>

<template>
  <div class="page-layout">
    <div class="toolbar flex flex-wrap gap-2 rounded-lg bg-gray-100 p-3">
      <el-radio-group v-model="activeDemo" size="small">
        <el-radio-button v-for="item in demos" :key="item.value" :value="item.value">
          {{ item.label }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <div class="content-area">
      <el-scrollbar class="content-scrollbar" height="100%" view-class="content-scroll">
        <div class="mx-auto max-w-4xl space-y-4">
          <el-card v-if="activeDemo === 'v-copy'" header="v-copy" shadow="hover">
            <p class="mb-3 text-sm text-gray-500">
              点击按钮将文本写入剪贴板
            </p>
            <el-input v-model="copyText" :maxlength="20" show-word-limit class="mb-3" />
            <el-button v-copy="copyText" type="primary">
              点击复制
            </el-button>
          </el-card>

          <el-card v-else-if="activeDemo === 'v-longpress'" header="v-longpress" shadow="hover">
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

          <el-card v-else-if="activeDemo === 'v-debounce'" header="v-debounce" shadow="hover">
            <p class="mb-3 text-sm text-gray-500">
              防抖点击：快速多次点击只会触发最后一次 (1000ms)
            </p>
            <el-button v-debounce="{ callback: onDebounce, time: 1000 }" type="primary">
              防抖按钮 ({{ debounceCount }})
            </el-button>
          </el-card>

          <el-card v-else-if="activeDemo === 'v-throttle'" header="v-throttle" shadow="hover">
            <p class="mb-3 text-sm text-gray-500">
              节流点击：间隔 1000ms 内只触发一次
            </p>
            <el-button v-throttle="{ callback: onThrottle, time: 1000 }" type="primary">
              节流按钮 ({{ throttleCount }})
            </el-button>
          </el-card>

          <el-card v-else-if="activeDemo === 'v-click-outside'" header="v-click-outside" shadow="hover">
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

          <el-card v-else-if="activeDemo === 'v-emoji'" header="v-emoji" shadow="hover">
            <p class="mb-3 text-sm text-gray-500">
              禁止输入 Emoji 表情和特殊字符
            </p>
            <input
              v-emoji
              placeholder="试试输入 emoji 😀"
              class="w-full border rounded px-3 py-2 text-sm outline-none focus:border-blue-400"
            >
          </el-card>

          <el-card v-else-if="activeDemo === 'v-input'" header="v-input" shadow="hover">
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

          <el-card v-else-if="activeDemo === 'v-ripple'" header="v-ripple" shadow="hover">
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
            <el-button v-ripple="rippleColor" type="primary" class="h-12 w-full rounded-lg text-lg">
              点击看波纹
            </el-button>
          </el-card>

          <el-card v-else header="v-lazy-load" shadow="hover">
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
                  callback: () => ElMessage.info('图片已加载'),
                }"
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='200'%3E%3Crect fill='%23e5e7eb' width='400' height='200'/%3E%3Ctext fill='%239ca3af' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ELoading...%3C/text%3E%3C/svg%3E"
                alt="lazy load demo"
                class="h-[200px] w-[400px] rounded object-cover"
              >
              <div class="h-40" />
            </div>
          </el-card>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-layout {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  min-width: 0;
  overflow: hidden;
  padding: 16px;
  gap: 16px;
  box-sizing: border-box;

  .toolbar {
    flex-shrink: 0;
  }

  .content-area {
    flex: 1;
    min-height: 0;
    min-width: 0;
    overflow: hidden;

    .content-scrollbar {
      height: 100%;
      min-height: 0;
      min-width: 0;

      :deep(.el-scrollbar__wrap) {
        overscroll-behavior: contain;
      }
    }

    .content-scroll {
      padding: 0 4px 64px;
      box-sizing: border-box;
    }
  }
}
</style>
