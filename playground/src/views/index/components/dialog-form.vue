<script setup lang="ts">
import { DialogForm } from '@fireflymit/ui'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const visible = ref(false)
const form = ref<Record<string, any>>({
  name: '',
  role: undefined,
  status: true,
})
const submitted = ref('')

const items = [
  { label: '用户名', key: 'name', type: 'input', props: { placeholder: '请输入用户名', clearable: true } },
  {
    label: '角色',
    key: 'role',
    type: 'select',
    props: {
      clearable: true,
      options: [
        { label: '管理员', value: 'admin' },
        { label: '运营', value: 'operator' },
        { label: '访客', value: 'guest' },
      ],
      placeholder: '请选择角色',
    },
  },
  { label: '启用', key: 'status', type: 'switch' },
]

const sleep = (time = 800) => new Promise(resolve => setTimeout(resolve, time))

const handleSubmit = async (values: Record<string, any>) => {
  await sleep()
  submitted.value = JSON.stringify(values, null, 2)
  ElMessage.success('弹窗表单已提交')
}
</script>

<template>
  <section class="dialog-form-demo">
    <header class="demo-header">
      <div class="demo-heading">
        <h3 class="demo-title">
          DialogForm
        </h3>
        <p class="demo-description">
          弹窗内完成新增/编辑表单提交。
        </p>
      </div>
      <el-button type="primary" @click="visible = true">
        新增用户
      </el-button>
    </header>

    <section class="demo-result">
      <div class="demo-result__header">
        <span>提交结果</span>
        <el-tag size="small" type="info">
          JSON
        </el-tag>
      </div>
      <pre class="demo-output">{{ submitted || '暂无提交数据' }}</pre>
    </section>

    <DialogForm
      v-model="visible"
      v-model:form="form"
      title="新增用户"
      :items="items"
      :submit="handleSubmit"
      :form-attrs="{ rules: { name: [{ required: true, message: '请输入用户名', trigger: 'blur' }] } }"
    />
  </section>
</template>

<style lang="scss" scoped>
.dialog-form-demo {
  width: 100%;

  .demo-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 14px;

    .demo-heading {
      min-width: 0;

      .demo-title {
        margin: 0;
        color: #111827;
        font-size: 18px;
        font-weight: 600;
        line-height: 26px;
      }

      .demo-description {
        margin: 4px 0 0;
        color: #64748b;
        font-size: 13px;
        line-height: 20px;
      }
    }
  }

  .demo-result {
    min-height: 120px;
    margin: 0;
    overflow: auto;
    background-color: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 6px;

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      color: #334155;
      font-size: 13px;
      font-weight: 600;
      border-bottom: 1px solid #e2e8f0;
      background-color: #f8fafc;
    }

    .demo-output {
      min-height: 88px;
      margin: 0;
      padding: 14px;
      overflow: auto;
      color: #334155;
      font-size: 13px;
      line-height: 20px;
      background-color: #fff;
    }
  }
}
</style>
