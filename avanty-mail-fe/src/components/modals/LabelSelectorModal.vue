<template>
  <BaseModal
    :is-visible="isVisible"
    title="Setează Eticheta"
    size="medium"
    :show-footer="true"
    :show-cancel-button="true"
    :show-confirm-button="true"
    cancel-text="Anulează"
    confirm-text="Salvează"
    confirm-type="primary"
    :loading="loading"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #body>
      <div class="label-options">
        <!-- No label option -->
        <div 
          class="label-option"
          :class="{ selected: !selectedLabelId }"
          @click="selectedLabelId = null"
        >
          <div class="option-content">
            <X class="remove-icon" />
            <span>Fără etichetă</span>
          </div>
        </div>
        
        <!-- Available labels -->
        <div 
          v-for="label in availableLabels" 
          :key="label.id"
          class="label-option"
          :class="{ selected: selectedLabelId === label.id }"
          @click="selectedLabelId = label.id"
        >
          <div class="option-content">
            <div 
              class="label-indicator"
              :style="{ backgroundColor: label.color }"
            ></div>
            <span>{{ label.label }}</span>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import BaseModal from './BaseModal.vue'
import { labelService } from '@/api'

interface Label {
  id: number
  label: string
  color: string
  category: string
}

interface Props {
  isVisible: boolean
  emailIds?: number[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  cancel: []
}>()

const selectedLabelId = ref<number | null>(null)
const availableLabels = ref<Label[]>([])
const loading = ref(false)

// Load labels when modal opens
watch(() => props.isVisible, async (isVisible) => {
  if (isVisible) {
    selectedLabelId.value = null;
    
    // Load available labels
    try {
      loading.value = true
      availableLabels.value = await labelService.getLabels()
    } catch (error) {
      console.error('Error loading labels:', error)
    } finally {
      loading.value = false
    }
  }
})

const handleCancel = () => {
  emit('cancel')
}

const handleConfirm = async () => {
  if (!props.emailIds) return
  
  try {
    loading.value = true
    await labelService.moveToLabel(props.emailIds, selectedLabelId.value);
    emit('cancel')
  } catch (error) {
    // Error is handled by labelService (toast shown)
    console.error('Error in label assignment:', error)
  } finally {
    loading.value = false
  }
}
</script>