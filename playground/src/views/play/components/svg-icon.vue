<script setup lang="ts">
import { SvgIcon } from '@fireflymit/ui'
</script>

<template>
  <div class="max-w-3xl w-full space-y-6">
    <div>
      <h3 class="mb-4 text-lg font-semibold">
        Remix Icon
      </h3>
      <div class="flex flex-wrap items-center gap-6">
        <SvgIcon icon="ri:github-fill" class="text-2xl" />
        <SvgIcon icon="ri:copilot-line" class="text-2xl text-blue-500" />
        <SvgIcon icon="ri:edge-line" class="text-2xl text-gray-600" />
        <SvgIcon icon="ri:planet-line" class="text-2xl text-yellow-500" />
        <SvgIcon icon="ri:windows-line" class="text-2xl text-cyan-500" />
        <SvgIcon icon="ri:thumb-up-line" class="text-2xl text-red-500" />
        <SvgIcon icon="ri:gift-2-line" class="text-2xl text-green-500" />
        <SvgIcon icon="ri:apple-line" class="text-2xl text-gray-500" />
      </div>
    </div>

    <div>
      <h3 class="mb-4 text-lg font-semibold">
        Spinners
      </h3>
      <div class="flex flex-wrap items-center gap-6">
        <SvgIcon icon="svg-spinners:3-dots-fade" class="text-2xl text-red-400" />
        <SvgIcon icon="svg-spinners:3-dots-bounce" class="text-2xl text-blue-400" />
        <SvgIcon icon="svg-spinners:3-dots-move" class="text-2xl text-orange-400" />
        <SvgIcon icon="svg-spinners:3-dots-rotate" class="text-2xl text-purple-400" />
        <SvgIcon icon="svg-spinners:clock" class="text-2xl text-yellow-500" />
        <SvgIcon icon="svg-spinners:tadpole" class="text-2xl text-orange-500" />
        <SvgIcon icon="svg-spinners:blocks-wave" class="text-2xl text-blue-500" />
      </div>
    </div>

    <div>
      <h3 class="mb-4 text-lg font-semibold">
        Material Line Icons
      </h3>
      <div class="flex flex-wrap items-center gap-6">
        <SvgIcon icon="line-md:phone-call-twotone-loop" class="text-2xl text-blue-500" />
        <SvgIcon icon="line-md:switch-off" class="text-2xl text-green-500" />
        <SvgIcon icon="line-md:sun-rising-filled-loop" class="text-2xl text-yellow-400" />
        <SvgIcon icon="line-md:volume-high-filled" class="text-2xl text-purple-500" />
        <SvgIcon icon="line-md:github-twotone" class="text-2xl text-gray-700" />
        <SvgIcon icon="line-md:telegram" class="text-2xl text-sky-500" />
        <SvgIcon icon="line-md:reddit-loop" class="text-2xl text-orange-400" />
        <SvgIcon icon="line-md:coffee-half-empty-filled-loop" class="text-2xl text-emerald-500" />
      </div>
    </div>

    <div>
      <h3 class="mb-4 text-lg font-semibold">
        使用示例
      </h3>
      <div class="space-y-4">
        <div>
          <p class="mb-2 text-sm text-gray-500">
            基础使用
          </p>
          <pre class="rounded-lg bg-gray-50 p-4 text-sm">&lt;SvgIcon icon="ri:home-line" /&gt;</pre>
        </div>
        <div>
          <p class="mb-2 text-sm text-gray-500">
            自定义大小
          </p>
          <pre class="rounded-lg bg-gray-50 p-4 text-sm">&lt;SvgIcon icon="ri:user-line" class="text-2xl" /&gt;</pre>
        </div>
        <div>
          <p class="mb-2 text-sm text-gray-500">
            自定义颜色
          </p>
          <pre class="rounded-lg bg-gray-50 p-4 text-sm">&lt;SvgIcon icon="ri:heart-fill" class="text-red-500" /&gt;</pre>
        </div>
        <div>
          <p class="mb-2 text-sm text-gray-500">
            组合使用
          </p>
          <pre class="rounded-lg bg-gray-50 p-4 text-sm">&lt;SvgIcon icon="ri:star-fill" class="text-4xl text-yellow-500" /&gt;</pre>
        </div>
      </div>
    </div>
  </div>
</template>
