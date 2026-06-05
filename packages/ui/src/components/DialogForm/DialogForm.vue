<script setup lang="ts">
import type { Slots } from 'vue'
import type { DialogFormEmits, FormPanelExpose } from './DialogForm.types'
import { ElButton, ElDialog } from 'element-plus'
import { computed, useSlots, useTemplateRef } from 'vue'
import { createNamespace } from '~/_utils'
import ProForm from '../ProForm/ProForm.vue'
import { dialogFormProps } from './DialogForm.types'

defineOptions({ name: 'DialogForm', inheritAttrs: false })

const props = defineProps(dialogFormProps)
const emit = defineEmits<DialogFormEmits>()

const visible = defineModel<boolean>({ default: false })
const formModel = defineModel<Record<string, any>>('form', { default: () => ({}) })
const submitting = defineModel<boolean>('loading', { default: false })

const slots: Slots = useSlots()
const formRef = useTemplateRef<FormPanelExpose>('formRef')
const [className, bem] = createNamespace('dialog-form')

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
  <ElDialog
    v-model="visible"
    :class="className"
    :destroy-on-close="destroyOnClose"
    :title="title"
    :width="width"
    v-bind="$attrs"
    @close="emit('close')"
    @closed="handleClosed"
    @open="emit('open')"
    @opened="emit('opened')"
  >
    <section :class="bem('__body')">
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
    </section>

    <template v-if="showFooter" #footer>
      <slot
        name="footer"
        :cancel="handleCancel"
        :form="formModel"
        :loading="submitting"
        :reset="handleReset"
        :submit="handleSubmit"
      >
        <div :class="bem('__footer')">
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
        </div>
      </slot>
    </template>
  </ElDialog>
</template>

<style lang="scss">
.ffm-dialog-form {
  overflow: hidden;
  border: 1px solid var(--el-border-color-extra-light);
  border-radius: 10px;
  box-shadow: 0 18px 54px rgb(15 23 42 / 20%);

  &__body {
    padding: 6px 24px 4px;
  }

  &__footer {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 16px 24px 20px;
    border-top: 1px solid var(--el-border-color-lighter);
    background-color: var(--el-bg-color);
  }

  .el-dialog__header {
    padding: 20px 24px 14px;
    margin-right: 0;
    border-bottom: 1px solid var(--el-border-color-extra-light);
    background: linear-gradient(180deg, var(--el-fill-color-extra-light) 0%, var(--el-bg-color) 100%);
  }

  .el-dialog__title {
    color: var(--el-text-color-primary);
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
  }

  .el-dialog__headerbtn {
    top: 6px;
    right: 8px;
    width: 44px;
    height: 44px;
  }

  .el-dialog__body {
    padding: 14px 0 10px;
  }

  .el-dialog__footer {
    padding: 0;
  }

  .ffm-form {
    padding: 0;
    background-color: transparent;
  }

  .ffm-form__row {
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
  .ffm-dialog-form {
    width: calc(100vw - 32px) !important;
    margin-top: 8vh;

    &__body {
      padding: 4px 16px 0;
    }

    &__footer {
      flex-wrap: wrap;
      padding: 14px 16px 16px;

      .el-button {
        flex: 1;
        min-width: 88px;
      }
    }

    .el-dialog__header {
      padding: 18px 16px 12px;
    }
  }
}
</style>
