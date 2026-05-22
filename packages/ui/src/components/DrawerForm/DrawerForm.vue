<script setup lang="ts">
import type { Slots } from 'vue'
import type { DrawerFormEmits, FormPanelExpose } from './DrawerForm.types'
import { ElButton, ElDrawer } from 'element-plus'
import { computed, useSlots, useTemplateRef } from 'vue'
import { createNamespace } from '~/_utils'
import ProForm from '../ProForm/ProForm.vue'
import { drawerFormProps } from './DrawerForm.types'

defineOptions({ name: 'DrawerForm', inheritAttrs: false })

const props = defineProps(drawerFormProps)
const emit = defineEmits<DrawerFormEmits>()

const visible = defineModel<boolean>({ default: false })
const formModel = defineModel<Record<string, any>>('form', { default: () => ({}) })
const submitting = defineModel<boolean>('loading', { default: false })

const slots: Slots = useSlots()
const formRef = useTemplateRef<FormPanelExpose>('formRef')
const [className, bem] = createNamespace('drawer-form')

const formSlotNames = computed<string[]>(() =>
  Object.keys(slots).filter((slotName: string) => !['default', 'footer', 'form'].includes(slotName)),
)

const isSubmitDisabled = computed(() => props.disabledSubmit || submitting.value)

const getOutput = () => formRef.value?.getOutput() ?? { ...formModel.value }

const validateForm = async () => {
  try {
    const result = await formRef.value?.validate()
    return result !== false
  } catch (error) {
    emit('validateError', error)
    return false
  }
}

const handleCancel = () => {
  emit('cancel')
  visible.value = false
}

const handleReset = () => {
  formRef.value?.reset()
  emit('reset')
}

const handleSubmit = async () => {
  const isValid = await validateForm()
  if (!isValid) return

  const values = getOutput()
  submitting.value = true
  emit('submit', values)

  try {
    await props.submit?.(values)
    emit('success', values)
    if (props.closeOnSuccess) {
      visible.value = false
    }
  } finally {
    submitting.value = false
  }
}

const handleClosed = () => {
  if (props.resetOnClosed) {
    formRef.value?.reset()
  }
  emit('closed')
}

defineExpose({
  ref: formRef,
  validate: validateForm,
  reset: handleReset,
  submit: handleSubmit,
  getOutput,
})
</script>

<template>
  <ElDrawer
    v-model="visible"
    :class="className"
    :destroy-on-close="destroyOnClose"
    :direction="direction"
    :size="size"
    :title="title"
    v-bind="$attrs"
    @close="emit('close')"
    @closed="handleClosed"
    @open="emit('open')"
    @opened="emit('opened')"
  >
    <section :class="bem('__panel')">
      <div :class="bem('__body')">
        <slot name="form" :form="formModel" :form-ref="formRef">
          <ProForm
            ref="formRef"
            v-model="formModel"
            :gutter="gutter"
            :items="items"
            :label-position="labelPosition"
            :label-width="labelWidth"
            :sanitize-output="sanitizeOutput"
            :show-reset="false"
            :show-submit="false"
            :span="span"
            v-bind="formAttrs"
          >
            <template v-for="slotName in formSlotNames" :key="slotName" #[slotName]="slotProps">
              <slot :name="slotName" v-bind="slotProps" />
            </template>
          </ProForm>
        </slot>
      </div>

      <footer v-if="showFooter" :class="bem('__footer')">
        <slot
          name="footer"
          :cancel="handleCancel"
          :form="formModel"
          :loading="submitting"
          :reset="handleReset"
          :submit="handleSubmit"
        >
          <ElButton v-if="showCancel" @click="handleCancel">
            {{ cancelText }}
          </ElButton>
          <ElButton v-if="showReset" @click="handleReset">
            {{ resetText }}
          </ElButton>
          <ElButton
            v-if="showSubmit"
            type="primary"
            :disabled="isSubmitDisabled"
            :loading="submitting"
            @click="handleSubmit"
          >
            {{ submitText }}
          </ElButton>
        </slot>
      </footer>
    </section>
  </ElDrawer>
</template>

<style lang="scss">
.art-drawer-form {
  box-shadow: -16px 0 42px rgb(15 23 42 / 14%);

  &__panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
  }

  &__body {
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 22px 24px 28px;
  }

  &__footer {
    display: flex;
    flex-shrink: 0;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px 24px;
    border-top: 1px solid var(--el-border-color-lighter);
    background-color: var(--el-bg-color);
    box-shadow: 0 -8px 20px rgb(15 23 42 / 4%);
  }

  .el-drawer__header {
    align-items: center;
    padding: 20px 24px 16px;
    margin-bottom: 0;
    border-bottom: 1px solid var(--el-border-color-extra-light);
    background: linear-gradient(180deg, var(--el-fill-color-extra-light) 0%, var(--el-bg-color) 100%);
  }

  .el-drawer__title {
    color: var(--el-text-color-primary);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }

  .el-drawer__close-btn {
    width: 32px;
    height: 32px;
    border-radius: 6px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }

  .el-drawer__body {
    padding: 0;
  }

  .art-form {
    padding: 0;
    background-color: transparent;
  }

  .art-form__row {
    row-gap: 2px;
  }

  .el-form-item {
    margin-bottom: 18px;
  }

  .el-select,
  .el-date-editor,
  .el-input-number {
    width: 100%;
  }
}

@media (width <= 768px) {
  .art-drawer-form {
    width: 100% !important;

    &__body {
      padding: 18px 16px 24px;
    }

    &__footer {
      flex-wrap: wrap;
      padding: 14px 16px;

      .el-button {
        flex: 1;
        min-width: 88px;
      }
    }

    .el-drawer__header {
      padding: 18px 16px 12px;
    }
  }
}
</style>
