<template>
  <div class="toast-container">
    <Transition name="toast" appear>
      <div v-if="visible" class="toast" :class="[type]">
        <div class="toast-icon">
          <CheckCircle v-if="type === 'success'" class="icon" />
          <AlertCircle v-else-if="type === 'error'" class="icon" />
          <Info v-else-if="type === 'info'" class="icon" />
          <AlertTriangle v-else class="icon" />
        </div>
        <div class="toast-content">
          <p class="toast-message">{{ message }}</p>
        </div>
        <button @click="$emit('close')" class="toast-close">
          <X class="close-icon" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-vue-next'
import '@/assets/toast.css';

interface Props {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  duration: 4000
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)

onMounted(() => {
  visible.value = true
  
  if (props.duration > 0) {
    setTimeout(() => {
      emit('close')
    }, props.duration)
  }
})
</script>