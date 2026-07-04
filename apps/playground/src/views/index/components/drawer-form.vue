<script setup lang="ts">
import { DrawerForm } from '@fireflymit/ui'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const visible = ref(false)
const form = ref<Record<string, any>>({
  name: '北区项目',
  owner: '',
  status: true,
  remark: '',
})
const submitted = ref('')

const items = [
  { label: '项目名称', key: 'name', type: 'input', props: { placeholder: '请输入项目名称', clearable: true } },
  { label: '负责人', key: 'owner', type: 'input', props: { placeholder: '请输入负责人', clearable: true } },
  { label: '启用', key: 'status', type: 'switch' },
  { label: '备注', key: 'remark', type: 'input', props: { rows: 4, type: 'textarea', placeholder: '请输入备注' } },
]

const sleep = (time = 800) => new Promise(resolve => setTimeout(resolve, time))

const handleSubmit = async (values: Record<string, any>) => {
  await sleep()
  submitted.value = JSON.stringify(values, null, 2)
  ElMessage.success('抽屉表单已提交')
}
</script>

<template>
  <section class="drawer-form-demo">
    <header class="demo-header">
      <div class="demo-heading">
        <h3 class="demo-title">
          DrawerForm
        </h3>
        <p class="demo-description">
          右侧抽屉里保留页面上下文，适合较长编辑流程。
        </p>
      </div>
      <el-button type="primary" @click="visible = true">
        编辑项目
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

    <DrawerForm
      v-model="visible"
      v-model:form="form"
      title="编辑项目"
      :items="items"
      :submit="handleSubmit"
      :form-attrs="{ rules: { name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }] } }"
    />
  </section>
</template>

<style lang="scss" scoped>
.drawer-form-demo {
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
