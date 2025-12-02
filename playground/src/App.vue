<script setup lang="ts">
import { reactive } from 'vue'

const formData = reactive({})

const formItems = [
  { key: 'name', label: '姓名', type: 'input', placeholder: '请输入姓名' },
  { key: 'age', label: '年龄', type: 'number', placeholder: '请输入年龄' },
  { key: 'gender', label: '性别', type: 'select', options: [
    { label: '男', value: 'male' },
    { label: '女', value: 'female' },
  ] },
]
</script>

<template>
  <h4>ArtBadge组件</h4>
  <ArtBadge type="primary" text="主要状态" />
  <ArtBadge type="success" text="成功" />
  <ArtBadge type="warning" text="警告" />
  <ArtBadge type="info" text="信息" />
  <ArtBadge type="error" text="错误" />

  <div style="padding: 20px">
    <ArtSearchBar
      v-model="formData"
      :items="formItems"
      :span="8"
      :showExpand="true"
      @search="() => console.log('搜索', formData)"
      @reset="() => console.log('重置')"
    />
    <pre>{{ formData }}</pre>
  </div>
</template>

<style scoped lang="sass">

</style>
