<template>
  <BaseModal
    :is-visible="isVisible"
    :title="label ? 'Editează Eticheta' : 'Adaugă Eticheta Nouă'"
    size="medium"
    modal-class="label-form"
    :show-footer="true"
    :show-cancel-button="true"
    :show-confirm-button="true"
    cancel-text="Anulează"
    :confirm-text="label ? 'Actualizează' : 'Adaugă'"
    confirm-type="primary"
    :loading="loading"
    @cancel="handleCancel"
    @confirm="handleConfirm"
  >
    <template #body>
      <div class="form-group">
        <label>Nume etichetă</label>
        <input 
          v-model="labelForm.label" 
          type="text" 
          placeholder="Introdu numele etichetei"
          class="form-input"
        />
      </div>


      <div class="form-group">
        <label>Culoare</label>
        <div class="color-picker">
          <input 
            v-model="labelForm.color" 
            type="color" 
            class="color-input"
          />
          <input 
            v-model="labelForm.color" 
            type="text" 
            class="color-text"
            placeholder="#000000"
          />
        </div>
      </div>

      <div class="form-group">
        <label>Icon</label>
        <div class="icon-selector">
          <div 
            v-for="iconOption in iconOptions" 
            :key="iconOption.name"
            class="icon-option"
            :class="{ 'selected': labelForm.icon === iconOption.name }"
            @click="labelForm.icon = iconOption.name"
          >
            <component :is="iconOption.component" class="icon-preview" />
            <span class="icon-name">{{ iconOption.name }}</span>
          </div>
        </div>
      </div>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive, watch, ref } from 'vue'
import BaseModal from './BaseModal.vue'
import { labelService } from '@/api'
import type { Label } from '@/types'
import { 
  Tag, Star, Bookmark, Heart, Flag, 
  AlertCircle, CheckCircle, Info, Zap, 
  Shield, Award, Target, Users, Calendar,
  Mail, File, Folder, Settings, Bell
} from 'lucide-vue-next'

interface Props {
  isVisible: boolean
  label?: Label | null
}

const props = defineProps<Props>()

const emit = defineEmits<{
  cancel: []
}>()

const loading = ref(false)

const labelForm = reactive({
  label: '',
  color: '#34d186',
  icon: 'Tag'
})

const iconOptions = [
  { name: 'Tag', component: Tag },
  { name: 'Star', component: Star },
  { name: 'Bookmark', component: Bookmark },
  { name: 'Heart', component: Heart },
  { name: 'Flag', component: Flag },
  { name: 'AlertCircle', component: AlertCircle },
  { name: 'CheckCircle', component: CheckCircle },
  { name: 'Info', component: Info },
  { name: 'Zap', component: Zap },
  { name: 'Shield', component: Shield },
  { name: 'Award', component: Award },
  { name: 'Target', component: Target },
  { name: 'Users', component: Users },
  { name: 'Calendar', component: Calendar },
  { name: 'Mail', component: Mail },
  { name: 'File', component: File },
  { name: 'Folder', component: Folder },
  { name: 'Settings', component: Settings },
  { name: 'Bell', component: Bell }
]

watch(() => props.label, (newLabel) => {
  if (newLabel) {
    labelForm.label = newLabel.label
    labelForm.color = newLabel.color
    labelForm.icon = newLabel.icon
  } else {
    labelForm.label = ''
    labelForm.color = '#34d186'
    labelForm.icon = 'Tag'
  }
}, { immediate: true })

const handleCancel = () => {
  emit('cancel')
}

const handleConfirm = async () => {
  if (!labelForm.label.trim()) {
    return
  }

  loading.value = true
  
  try {
    const labelData = {
      label: labelForm.label.trim(),
      color: labelForm.color,
      icon: labelForm.icon
    }

    if (props.label?.id) {
      await labelService.editLabel(props.label.id, labelData)
    } else {
      await labelService.addLabel(labelData)
    }
    
    emit('cancel')
  } catch (error) {
    console.error('Error in label modal:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #374151;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.form-input:focus {
  outline: none;
  border-color: #34d186;
  box-shadow: 0 0 0 3px rgba(52, 209, 134, 0.1);
}

.color-picker {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.color-input {
  width: 3rem;
  height: 3rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  padding: 0;
}

.color-text {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: monospace;
  font-size: 0.875rem;
}

.icon-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 0.5rem;
  max-height: 200px;
  overflow-y: auto;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
}

.icon-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  border: 2px solid transparent;
}

.icon-option:hover {
  background: #f3f4f6;
  transform: translateY(-1px);
}

.icon-option.selected {
  border-color: #34d186;
  background: rgba(52, 209, 134, 0.1);
  color: #059669;
}

.icon-preview {
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: 0.25rem;
}

.icon-name {
  font-size: 0.75rem;
  text-align: center;
  font-weight: 500;
}
</style>