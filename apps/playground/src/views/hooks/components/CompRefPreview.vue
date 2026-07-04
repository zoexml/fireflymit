<script setup lang="ts">
const name = ref('Fireflymit')
const role = ref('Composable Playground')
const inputRef = ref<HTMLInputElement>()

const focusNameInput = () => inputRef.value?.focus()
const resetProfile = () => {
  name.value = 'Fireflymit'
  role.value = 'Composable Playground'
}
const getSnapshot = () => ({
  name: name.value,
  role: role.value,
})

defineExpose({
  focusNameInput,
  resetProfile,
  getSnapshot,
})
</script>

<template>
  <div class="border border-gray-200 rounded-xl bg-gray-50 p-4 space-y-3">
    <div class="space-y-1">
      <p class="text-sm text-gray-700 font-medium">
        子组件实例
      </p>
      <p class="text-xs text-gray-500">
        通过 <code>defineExpose</code> 暴露方法，再配合 <code>useCompRef</code> 在父组件里拿到类型安全的实例引用。
      </p>
    </div>

    <div class="grid gap-3 md:grid-cols-2">
      <label class="text-sm text-gray-600 space-y-1">
        <span>名称</span>
        <input
          ref="inputRef"
          v-model="name"
          class="w-full border border-gray-300 rounded px-3 py-2 outline-none transition focus:border-blue-500"
        >
      </label>

      <label class="text-sm text-gray-600 space-y-1">
        <span>角色</span>
        <input
          v-model="role"
          class="w-full border border-gray-300 rounded px-3 py-2 outline-none transition focus:border-blue-500"
        >
      </label>
    </div>
  </div>
</template>
