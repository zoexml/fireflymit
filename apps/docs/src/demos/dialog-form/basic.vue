<script setup lang="ts">
import type { FormItem } from '@fireflymit/ui'
import { DialogForm } from '@fireflymit/ui'
import { ElButton } from 'element-plus'
import { ref } from 'vue'

const visible = ref(false)
const formData = ref<Record<string, any>>({})
const log = ref('')

const items: FormItem[] = [
  { label: '项目名称', key: 'name', type: 'input', placeholder: '请输入项目名称' },
  {
    label: '负责人',
    key: 'owner',
    type: 'select',
    props: {
      placeholder: '请选择负责人',
      options: [
        { label: '张三', value: 'zhangsan' },
        { label: '李四', value: 'lisi' },
      ],
    },
  },
  { label: '启用', key: 'enabled', type: 'switch' },
]

async function handleSubmit(values: Record<string, any>) {
  await new Promise(resolve => setTimeout(resolve, 600))
  log.value = `提交成功：${JSON.stringify(values)}`
}
</script>

<template>
  <div class="dialog-form-demo">
    <ElButton type="primary" @click="visible = true">
      打开弹窗
    </ElButton>
    <p class="dialog-form-demo__log">
      {{ log || '点击按钮打开弹窗，提交时会走异步 loading。' }}
    </p>

    <DialogForm
      v-model="visible"
      v-model:form="formData"
      title="新建项目"
      :items="items"
      :submit="handleSubmit"
    />
  </div>
</template>

<style scoped>
.dialog-form-demo__log {
  margin: 10px 0 0;
  font-size: 13px;
  color: var(--vp-c-text-2);
}
</style>
