<template>
  <div v-if="isVisible" class="dialog-overlay" @click="handleOverlayClick">
    <div class="dialog-container" @click.stop>
      <div class="dialog-header">
        <div class="dialog-icon" :class="iconClass">
          <component :is="iconComponent" class="icon" />
        </div>
        <h3 class="dialog-title">{{ title }}</h3>
      </div>
      
      <div class="dialog-content">
        <p class="dialog-message">{{ message }}</p>
        <div v-if="details" class="dialog-details">
          {{ details }}
        </div>
      </div>
      
      <div class="dialog-actions">
        <button 
          @click="handleCancel" 
          class="dialog-btn cancel-btn"
          :disabled="loading"
        >
          {{ cancelText }}
        </button>
        <button 
          @click="handleConfirm" 
          class="dialog-btn confirm-btn"
          :class="confirmButtonClass"
          :disabled="loading"
        >
          <Loader v-if="loading" class="btn-loader spinning" />
          <component v-else :is="confirmIconComponent" class="btn-icon" />
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { 
  AlertTriangle, 
  Trash2, 
  AlertCircle, 
  Info, 
  CheckCircle,
  Loader
} from 'lucide-vue-next'

interface Props {
  isVisible: boolean
  title?: string
  message: string
  details?: string
  type?: 'warning' | 'danger' | 'info' | 'success'
  confirmText?: string
  cancelText?: string
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Confirmare',
  type: 'warning',
  confirmText: 'Confirmă',
  cancelText: 'Anulează',
  loading: false
})

const emit = defineEmits<{
  confirm: []
  cancel: []
  close: []
}>()

const iconComponent = computed(() => {
  const iconMap = {
    warning: AlertTriangle,
    danger: Trash2,
    info: Info,
    success: CheckCircle
  }
  return iconMap[props.type]
})

const confirmIconComponent = computed(() => {
  const iconMap = {
    warning: AlertTriangle,
    danger: Trash2,
    info: CheckCircle,
    success: CheckCircle
  }
  return iconMap[props.type]
})

const iconClass = computed(() => {
  const classMap = {
    warning: 'icon-warning',
    danger: 'icon-danger',
    info: 'icon-info',
    success: 'icon-success'
  }
  return classMap[props.type]
})

const confirmButtonClass = computed(() => {
  const classMap = {
    warning: 'warning-btn',
    danger: 'danger-btn',
    info: 'info-btn',
    success: 'success-btn'
  }
  return classMap[props.type]
})

function handleOverlayClick() {
  if (!props.loading) {
    handleCancel()
  }
}

function handleConfirm() {
  if (!props.loading) {
    emit('confirm')
  }
}

function handleCancel() {
  if (!props.loading) {
    emit('cancel')
    emit('close')
  }
}
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.dialog-container {
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  max-width: 440px;
  width: 100%;
  overflow: hidden;
  animation: dialogEnter 0.2s ease-out;
}

@keyframes dialogEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.dialog-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2rem 1rem 2rem;
  text-align: center;
}

.dialog-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.dialog-icon .icon {
  width: 32px;
  height: 32px;
  color: white;
}

.icon-warning {
  background: linear-gradient(135deg, #ffc107 0%, #f39c12 100%);
}

.icon-danger {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
}

.icon-info {
  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
}

.icon-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
}

.dialog-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
}

.dialog-content {
  padding: 0 2rem 1.5rem 2rem;
  text-align: center;
}

.dialog-message {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  margin: 0 0 1rem 0;
}

.dialog-details {
  font-size: 0.9rem;
  color: #888;
  background: #f8f9fa;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border-left: 4px solid #e9ecef;
}

.dialog-actions {
  display: flex;
  gap: 0.75rem;
  padding: 1.5rem 2rem 2rem 2rem;
}

.dialog-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 2px solid transparent;
  min-height: 48px;
}

.dialog-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cancel-btn {
  background: #f8f9fa;
  color: #6c757d;
  border-color: #e0e0e0;
}

.cancel-btn:hover:not(:disabled) {
  background: #e9ecef;
  border-color: #ced4da;
  color: #495057;
}

.confirm-btn {
  background: white;
  color: white;
}

.warning-btn {
  background: linear-gradient(135deg, #ffc107 0%, #f39c12 100%);
  color: white;
}

.warning-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #f39c12 0%, #e67e22 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
}

.danger-btn {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
}

.danger-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #c82333 0%, #a71e2a 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.info-btn {
  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
  color: white;
}

.info-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #138496 0%, #117a8b 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
}

.success-btn {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  color: white;
}

.success-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #20c997 0%, #17a2b8 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.btn-icon, .btn-loader {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .dialog-overlay {
    padding: 0.5rem;
  }
  
  .dialog-container {
    border-radius: 12px;
  }
  
  .dialog-header {
    padding: 1.5rem 1.5rem 1rem 1.5rem;
  }
  
  .dialog-icon {
    width: 56px;
    height: 56px;
  }
  
  .dialog-icon .icon {
    width: 28px;
    height: 28px;
  }
  
  .dialog-title {
    font-size: 1.25rem;
  }
  
  .dialog-content {
    padding: 0 1.5rem 1rem 1.5rem;
  }
  
  .dialog-actions {
    flex-direction: column;
    padding: 1rem 1.5rem 1.5rem 1.5rem;
  }
  
  .dialog-btn {
    padding: 1rem;
  }
}
</style>