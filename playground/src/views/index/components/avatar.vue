<script setup lang="ts">
const users = ['Alice', 'Bob', 'Charlie', 'David']

const chineseNames = ['张三', '李四', '王五', '赵六']

const sizes = [24, 32, 40, 48, 64] as const

const shapes = ['square', 'circle'] as const

const customColors = ['#f56565', '#4299e1', '#48bb78', '#ed8936']
</script>

<template>
  <div class="space-y-8">
    <!-- 默认随机颜色 -->
    <div>
      <h3 class="mb-3 text-gray-600 font-medium">
        默认（随机背景色）
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <FAvatar v-for="name in users" :key="name" :name="name" />
      </div>
    </div>

    <!-- 中文名称 -->
    <div>
      <h3 class="mb-3 text-gray-600 font-medium">
        中文名称
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <FAvatar v-for="name in chineseNames" :key="name" :name="name" />
      </div>
    </div>

    <!-- 不同尺寸 -->
    <div>
      <h3 class="mb-3 text-gray-600 font-medium">
        尺寸
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <FAvatar
          v-for="size in sizes"
          :key="size"
          name="User"
          :size="size"
          background-color="#4299e1"
        />
      </div>
    </div>

    <!-- 不同形状 -->
    <div>
      <h3 class="mb-3 text-gray-600 font-medium">
        形状
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <FAvatar
          v-for="shape in shapes"
          :key="shape"
          :name="shape"
          :shape="shape"
          background-color="#48bb78"
        />
      </div>
    </div>

    <!-- 指定颜色 -->
    <div>
      <h3 class="mb-3 text-gray-600 font-medium">
        指定颜色
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <FAvatar
          v-for="(color, i) in customColors"
          :key="color"
          :name="chineseNames[i]"
          :background-color="color"
        />
      </div>
    </div>

    <!-- 图片头像 -->
    <div>
      <h3 class="mb-3 text-gray-600 font-medium">
        图片头像
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <FAvatar
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          name="GitHub"
          :size="48"
        />
        <FAvatar
          src="https://avatars.githubusercontent.com/u/102540407?s=200&v=4"
          name="Vue"
          :size="48"
        />
        <FAvatar name="管理员" :size="48" background-color="#7c3aed" />
      </div>
    </div>

    <!-- 组合展示 -->
    <div>
      <h3 class="mb-3 text-gray-600 font-medium">
        组合（不同形状+尺寸+图片）
      </h3>
      <div class="flex flex-wrap items-center gap-3">
        <FAvatar
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          name="圆形图片"
          :size="64"
          shape="circle"
        />
        <FAvatar
          src="https://avatars.githubusercontent.com/u/9919?s=200&v=4"
          name="方形图片"
          :size="64"
          shape="square"
        />
        <FAvatar name="张" :size="40" shape="circle" background-color="#f56565" />
        <FAvatar name="李" :size="40" shape="square" background-color="#ed8936" />
      </div>
    </div>
  </div>
</template>
