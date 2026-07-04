<script setup lang="ts">
import { useCompRef, useLockScroll } from '@fireflymit/hooks'
import { ElMessage } from 'element-plus'
import CompRefPreview from './components/CompRefPreview.vue'

type HookDemo = 'useCompRef' | 'useChildren' | 'useLockScroll'

const demos = [
  { label: 'useCompRef', value: 'useCompRef' },
  { label: 'useChildren', value: 'useChildren' },
  { label: 'useLockScroll', value: 'useLockScroll' },
] as const satisfies ReadonlyArray<{ label: string, value: HookDemo }>

const activeDemo = ref<HookDemo>('useCompRef')

const lockBodyScroll = ref(false)
useLockScroll(lockBodyScroll)

const compRefPreviewRef = useCompRef(CompRefPreview)

const focusChildInput = () => {
  compRefPreviewRef.value?.focusNameInput()
}

const readChildSnapshot = () => {
  const snapshot = compRefPreviewRef.value?.getSnapshot()
  if (!snapshot) {
    ElMessage.warning('子组件还没有挂载完成')
    return
  }

  ElMessage.info(`name: ${snapshot.name} / role: ${snapshot.role}`)
}

const resetChildSnapshot = () => {
  compRefPreviewRef.value?.resetProfile()
  ElMessage.success('已通过组件实例重置子组件状态')
}

const useChildrenExample = `
<script setup lang="ts">
import { getCurrentInstance } from 'vue'
import { useChildren } from '@fireflymit/hooks'

const vm = getCurrentInstance()!
const { children, addChild, removeChild } = useChildren(vm, 'DemoItem')
<\/script>
`.trim()
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
          <el-card v-if="activeDemo === 'useCompRef'" header="useCompRef" shadow="hover">
            <div class="space-y-4">
              <p class="text-sm text-gray-500">
                为子组件 <code>ref</code> 自动推导实例类型，父组件可以安全调用 <code>defineExpose</code> 暴露的方法。
              </p>

              <CompRefPreview ref="compRefPreviewRef" />

              <div class="flex flex-wrap gap-2">
                <el-button type="primary" @click="focusChildInput">
                  聚焦子组件输入框
                </el-button>
                <el-button @click="readChildSnapshot">
                  读取当前值
                </el-button>
                <el-button type="warning" plain @click="resetChildSnapshot">
                  重置子组件状态
                </el-button>
              </div>
            </div>
          </el-card>

          <el-card v-else-if="activeDemo === 'useChildren'" header="useChildren" shadow="hover">
            <div class="space-y-4">
              <p class="text-sm text-gray-500">
                适合父组件收集指定名称的子组件实例，并按渲染顺序维护一份稳定列表，常用于表单项、步骤条、选项组这类容器组件。
              </p>

              <pre class="overflow-x-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-100 leading-6"><code>{{ useChildrenExample }}</code></pre>

              <div class="grid gap-3 md:grid-cols-3">
                <div class="border border-gray-200 rounded-xl p-4">
                  <p class="text-sm text-gray-700 font-medium">
                    <code>children</code>
                  </p>
                  <p class="mt-2 text-sm text-gray-500">
                    响应式的已注册子组件列表，顺序和页面渲染顺序保持一致。
                  </p>
                </div>
                <div class="border border-gray-200 rounded-xl p-4">
                  <p class="text-sm text-gray-700 font-medium">
                    <code>addChild</code>
                  </p>
                  <p class="mt-2 text-sm text-gray-500">
                    子组件挂载后注册自己，父组件会重新计算顺序。
                  </p>
                </div>
                <div class="border border-gray-200 rounded-xl p-4">
                  <p class="text-sm text-gray-700 font-medium">
                    <code>removeChild</code>
                  </p>
                  <p class="mt-2 text-sm text-gray-500">
                    子组件卸载时注销，避免父级持有过期实例。
                  </p>
                </div>
              </div>
            </div>
          </el-card>

          <el-card v-else header="useLockScroll" shadow="hover">
            <div class="space-y-4">
              <p class="text-sm text-gray-500">
                用一个 <code>Ref&lt;boolean&gt;</code> 控制 <code>document.body</code> 的滚动锁定，适合抽屉、弹窗这类基于原生页面滚动的场景。
              </p>

              <el-alert
                title="当前 playground 使用内部滚动容器，因此这里更适合作为 API 演示；在业务页面里通常配合原生 body 滚动使用。"
                type="info"
                :closable="false"
                show-icon
              />

              <div class="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3">
                <div class="space-y-1">
                  <p class="text-sm text-gray-700 font-medium">
                    body scroll lock
                  </p>
                  <p class="text-xs text-gray-500">
                    切换后会给 <code>document.body</code> 添加或移除 <code>er-overflow-hidden</code>
                  </p>
                </div>
                <el-switch v-model="lockBodyScroll" />
              </div>

              <el-tag :type="lockBodyScroll ? 'danger' : 'info'">
                {{ lockBodyScroll ? '已请求锁定 body 滚动' : '当前未锁定' }}
              </el-tag>
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
