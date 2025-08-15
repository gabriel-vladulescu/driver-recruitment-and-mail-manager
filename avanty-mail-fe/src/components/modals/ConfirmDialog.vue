<template>
  <BaseModal
    :is-visible="isVisible"
    :title="title"
    :header-icon="iconComponent"
    :header-icon-style="'circle'"
    :header-icon-color="type"
    size="small"
    modal-class="confirm-dialog"
    :show-footer="true"
    :show-cancel-button="true"
    :show-confirm-button="true"
    :cancel-text="cancelText"
    :confirm-text="confirmText"
    :confirm-type="confirmType"
    :confirm-icon="confirmIcon"
    :loading="loading || internalLoading"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #body>
      <div class="dialog-content">
        <p class="dialog-message">{{ message }}</p>
        <div v-if="details" class="dialog-details">
          {{ details }}
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { AlertTriangle, Trash2, AlertCircle, Info, CheckCircle } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'

interface Props {
  isVisible: boolean
  title?: string
  message: string
  details?: string
  type?: 'warning' | 'danger' | 'info' | 'success'
  cancelText?: string
  confirmText?: string
  confirmIcon?: any
  loading?: boolean
  onConfirm?: () => Promise<void> | void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'warning',
  cancelText: 'Anulează',
  confirmText: 'Confirmă',
  loading: false
})

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

const internalLoading = ref(false)

// Computed properties
const iconComponent = computed(() => {
  const icons = {
    warning: AlertTriangle,
    danger: Trash2,
    info: Info,
    success: CheckCircle
  }
  return icons[props.type] || AlertCircle
})


const confirmType = computed(() => {
  const typeMap = {
    warning: 'warning' as const,
    danger: 'danger' as const,
    info: 'info' as const,
    success: 'success' as const
  }
  return typeMap[props.type] || 'warning'
})

// Event handlers
const handleCancel = () => {
  emit('cancel')
}

const handleConfirm = async () => {
  if (props.onConfirm) {
    try {
      internalLoading.value = true
      await props.onConfirm();
      emit('cancel'); // Auto-close on success using cancel
    } catch (error) {
      console.error('Confirm action failed:', error)
    } finally {
      internalLoading.value = false
    }
  } else {
    emit('confirm')
  }
}
</script>