<!--
  组件演示容器
  - 示例代码写在 apps/docs/src/demos/<目录>/<文件>.vue 中（真实 SFC，可被类型检查与构建）
  - 页面中用 <Demo name="<目录>/<文件>" title="..." /> 引用
  - 容器同时渲染组件与可展开的源码，源码与渲染结果来自同一个文件，不会漂移
-->
<script setup lang="ts">
import type { Component } from 'vue'
import { computed, onMounted, ref } from 'vue'

defineOptions({ name: 'Demo' })

const props = withDefaults(defineProps<{
  /** 示例文件路径（相对 apps/docs/src/demos，不含 .vue 后缀） */
  name: string
  /** 示例标题 */
  title?: string
  /** 示例说明 */
  description?: string
  /** 源码区默认展开 */
  defaultOpen?: boolean
  /**
   * 仅在浏览器中渲染示例本体（源码区仍然 SSR）。
   * 用于含有无法与 SSG 输出对齐的第三方组件的示例，例如 Element Plus 的 ElSelect。
   */
  clientOnly?: boolean
}>(), {
  title: '',
  description: '',
  defaultOpen: false,
  clientOnly: false,
})

/**
 * 两个 glob 使用同一组 key，分别拿到组件本体和源码字符串。
 * 示例全部在本地仓库中，构建期即静态打包，SSG 不需要运行时代码编译。
 */
const demoModules = import.meta.glob<{ default: Component }>('../../../src/demos/**/*.vue', { eager: true })
const demoSources = import.meta.glob<string>('../../../src/demos/**/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
})

const demoKey = computed(() => {
  const path = props.name.replace(/^\/+|\/+$/g, '').replace(/\.vue$/, '')
  return `../../../src/demos/${path}.vue`
})

const demoComponent = computed(() => demoModules[demoKey.value]?.default)
const source = computed(() => demoSources[demoKey.value] ?? '')

if (import.meta.env.DEV && !demoComponent.value) {
  console.warn(`[Demo] 未找到示例文件：apps/docs/src/demos/${props.name}.vue`)
}

const copied = ref(false)

/**
 * clientOnly 示例的挂载标记：
 * SSR 与客户端首帧都渲染占位文案，挂载后再渲染示例，避免水合不一致。
 * （VitePress 的 ClientOnly 不渲染 fallback，且 SSR 输出为空，所以这里自行实现。）
 */
const mounted = ref(false)
onMounted(() => {
  mounted.value = true
})

async function copySource() {
  if (!source.value || typeof navigator === 'undefined' || !navigator.clipboard) { return }

  try {
    await navigator.clipboard.writeText(source.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1500)
  } catch {
    // 复制失败（如非安全上下文）时静默降级，源码本身仍可手动选中
  }
}
</script>

<template>
  <div class="ffm-demo">
    <div v-if="title || description" class="ffm-demo__header">
      <p v-if="title" class="ffm-demo__title">
        {{ title }}
      </p>
      <p v-if="description" class="ffm-demo__description">
        {{ description }}
      </p>
    </div>

    <div class="ffm-demo__preview">
      <template v-if="demoComponent">
        <component :is="demoComponent" v-if="!clientOnly || mounted" />
        <p v-else class="ffm-demo__pending">
          示例包含依赖浏览器环境的组件，页面加载后渲染
        </p>
      </template>
      <p v-else class="ffm-demo__missing">
        未找到示例：{{ name }}
      </p>
    </div>

    <details v-if="source" class="ffm-demo__source" :open="defaultOpen">
      <summary class="ffm-demo__summary">
        查看源码
      </summary>
      <div class="ffm-demo__code">
        <button class="ffm-demo__copy" type="button" @click="copySource">
          {{ copied ? '已复制' : '复制' }}
        </button>
        <pre><code>{{ source }}</code></pre>
      </div>
    </details>
  </div>
</template>

<style scoped>
.ffm-demo {
  margin: 20px 0;
  overflow: hidden;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
}

.ffm-demo__header {
  padding: 12px 20px;
  border-bottom: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-alt);
}

.ffm-demo__title {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--vp-c-text-1);
}

.ffm-demo__description {
  margin: 2px 0 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}

.ffm-demo__preview {
  padding: 24px 20px;
}

.ffm-demo__missing {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-danger-1);
}

.ffm-demo__pending {
  margin: 0;
  font-size: 13px;
  color: var(--vp-c-text-3);
}

.ffm-demo__source {
  border-top: 1px solid var(--vp-c-divider);
}

.ffm-demo__summary {
  padding: 10px 20px;
  font-size: 13px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  user-select: none;
  background-color: var(--vp-c-bg-alt);
}

.ffm-demo__summary:hover {
  color: var(--vp-c-brand-1);
}

.ffm-demo__code {
  position: relative;
  border-top: 1px solid var(--vp-c-divider);
}

.ffm-demo__code pre {
  margin: 0;
  padding: 16px 20px;
  overflow-x: auto;
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.7;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-alt);
}

.ffm-demo__code code {
  font-family: inherit;
}

.ffm-demo__copy {
  position: absolute;
  top: 8px;
  right: 12px;
  padding: 2px 10px;
  font-size: 12px;
  color: var(--vp-c-text-2);
  cursor: pointer;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
}

.ffm-demo__copy:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}
</style>
