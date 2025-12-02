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
  <div class="search-bar-page">
    <div style="padding: 20px">
      <ArtSearchBar;
        v-model="formData"
        :items="formItems"
        :span="8"
        :showExpand="true"
        @search="() => console.log('搜索', formData)"
        @reset="() => console.log('重置')"
      />
      <pre>{{ formData }}</pre>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
