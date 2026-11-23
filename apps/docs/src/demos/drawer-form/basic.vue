<script setup lang="ts">
import type { FormItem } from '@fireflymit/ui'
import { DrawerForm } from '@fireflymit/ui'
import { ElButton } from 'element-plus'
import { ref } from 'vue'

const visible = ref(false)
const formData = ref<Record<string, any>>({})
const log = ref('')

const items: FormItem[] = [
  { label: '任务名称', key: 'name', type: 'input', placeholder: '请输入任务名称' },
  { label: '是否启用', key: 'enabled', type: 'switch' },
  {
    label: '优先级',
    key: 'priority',
    type: 'radiogroup',
    props: {
      options: [
        { label: '低', value: 'low' },
        { label: '中', value: 'medium' },
        { label: '高', value: 'high' },
      ],
    },
  },
]

function handleSubmit(values: Record<string, any>) {
  log.value = `提交成功：${JSON.stringify(values)}`
}
</script>

<template>
  <div class="drawer-form-demo">
    <ElButton type="primary" @click="visible = true">
      打开抽屉
    </ElButton>
    <p class="drawer-form-demo__log">
      {{ log || '从右侧滑出抽屉，表单与底部按钮由组件内置。' }}
    </p>

    <DrawerForm
      v-model="visible"
      v-model:form="formData"
      title="编辑任务"
      direction="rtl"
      size="420px"
      :items="items"
      :submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.drawer-form-demo__log {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
