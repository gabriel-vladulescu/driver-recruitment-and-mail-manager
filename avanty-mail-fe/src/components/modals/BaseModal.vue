<template>
  <div v-if="isVisible" class="modal-wrapper">
    <div class="modal-overlay" @click="handleOverlayClick"></div>
    <div 
      class="modal-container" 
      :class="[modalClass, sizeClass]" 
      @click.stop
    >
      <!-- Header -->
      <div v-if="showHeader" class="modal-header" :class="headerClass">
        <div class="header-info">
          <!-- Header Icon (optional) -->
          <div v-if="headerIcon" class="header-icon" :class="[headerIconStyleClass, headerIconColorClass]">
            <component :is="headerIcon" class="header-icon-svg" />
          </div>
          
          <!-- Custom header slot or default title -->
          <slot name="header">
            <div class="header-text">
              <h3 v-if="title">{{ title }}</h3>
              <p v-if="subtitle" class="header-subtitle">{{ subtitle }}</p>
            </div>
          </slot>
        </div>
        
        <!-- Cancel button -->
        <button 
          @click="handleCancel" 
          class="close-btn"
          :disabled="loading"
        >
          <X class="close-icon" />
        </button>
      </div>

      <!-- Body -->
      <div class="modal-body" :class="bodyClass">
        <slot name="body">
          <!-- Default content slot -->
          <slot></slot>
        </slot>
      </div>

      <!-- Footer -->
      <div v-if="showFooter" class="modal-footer" :class="footerClass">
        <slot name="footer">
          <!-- Default footer with cancel/confirm buttons -->
          <button 
            v-if="showCancelButton"
            @click="handleCancel" 
            class="dialog-btn cancel-btn"
            :disabled="loading"
          >
            {{ cancelText }}
          </button>
          
          <button 
            v-if="showConfirmButton"
            @click="handleConfirm" 
            class="dialog-btn"
            :class="confirmButtonClass"
            :disabled="loading"
          >
            <Loader v-if="loading" class="btn-loader spinning" />
            <component v-else-if="confirmIcon" :is="confirmIcon" class="btn-icon" />
            {{ confirmText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X, Loader } from 'lucide-vue-next'
import '@/assets/modal.css'

interface Props {
  // Visibility
  isVisible: boolean
  
  // Modal configuration
  title?: string
  subtitle?: string
  size?: 'small' | 'medium' | 'large' | 'xlarge'
  modalClass?: string
  headerClass?: string
  bodyClass?: string
  footerClass?: string
  
  // Header options
  showHeader?: boolean
  headerIcon?: any
  headerIconStyle?: 'rounded' | 'square' | 'circle'
  headerIconColor?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
  
  // Footer options
  showFooter?: boolean
  showCancelButton?: boolean
  showConfirmButton?: boolean
  cancelText?: string
  confirmText?: string
  confirmIcon?: any
  confirmType?: 'primary' | 'warning' | 'danger' | 'info' | 'success'
  
  // Behavior
  closeOnOverlayClick?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  showHeader: true,
  headerIconStyle: 'rounded',
  headerIconColor: 'primary',
  showFooter: false,
  showCancelButton: false,
  showConfirmButton: false,
  cancelText: 'Anulează',
  confirmText: 'Confirmă',
  confirmType: 'primary',
  closeOnOverlayClick: false,
  loading: false
})

const emit = defineEmits<{
  cancel: []
  confirm: []
}>()

// Computed classes
const sizeClass = computed(() => {
  const sizes = {
    small: 'modal-sm',
    medium: 'modal-md', 
    large: 'modal-lg',
    xlarge: 'modal-xl'
  }
  return sizes[props.size]
})

const confirmButtonClass = computed(() => {
  const types = {
    primary: 'btn-save',
    warning: 'warning-btn',
    danger: 'danger-btn',
    info: 'info-btn',
    success: 'success-btn'
  }
  return types[props.confirmType]
})

const headerIconStyleClass = computed(() => {
  switch (props.headerIconStyle) {
	case 'rounded':
	  return 'header-icon-rounded'
	case 'square':
	  return 'header-icon-square'
	case 'circle':
	  return 'header-icon-circle'
	default:
	  return 'header-icon-rounded'
  }
})	

const headerIconColorClass = computed(() => {
  return `header-icon-${props.headerIconColor}`
})

// Event handlers
const handleOverlayClick = () => {
  if (props.closeOnOverlayClick && !props.loading) {
    handleCancel()
  }
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
  }
}

const handleConfirm = () => {
  if (!props.loading) {
    emit('confirm')
  }
}
</script>

<style scoped>
.header-subtitle {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  font-weight: normal;
}

/* Base header icon styles */
.header-icon {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s ease;
}

.header-icon-svg {
  width: 24px;
  height: 24px;
  color: white;
  transition: all 0.2s ease;
}

/* Icon Style Variations */
.header-icon-circle {
  border-radius: 50%;
}

.header-icon-rounded {
  border-radius: 12px;
}

.header-icon-square {
  border-radius: 6px;
}

/* Icon Color Variations */
.header-icon-primary {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3);
}

.header-icon-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  box-shadow: 0 4px 12px rgba(40, 167, 69, 0.3);
}

.header-icon-warning {
  background: linear-gradient(135deg, #ffc107 0%, #f39c12 100%);
  box-shadow: 0 4px 12px rgba(243, 156, 18, 0.3);
}

.header-icon-danger {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}

.header-icon-info {
  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
  box-shadow: 0 4px 12px rgba(23, 162, 184, 0.3);
}

/* Size variations */
.modal-sm {
  max-width: 400px;
}

.modal-md {
  max-width: 500px;
}

.modal-lg {
  max-width: 600px;
}

.modal-xl {
  max-width: 800px;
}
</style>