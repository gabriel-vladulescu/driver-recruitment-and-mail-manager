<template>
  <div 
    class="sent-message-item"
    :class="{ 'selected': isSelected }"
    @click="$emit('click')"
  >
    <div class="message-icon">
      <Send class="icon" />
    </div>
    
    <div class="message-content">
      <div class="message-header">
        <div class="message-subject">{{ sentMessage.subject }}</div>
        <div class="message-time">{{ formattedTime }}</div>
      </div>
      
      <div class="message-info">
        <div class="message-recipient">
          <Mail class="recipient-icon" />
          <span>{{ sentMessage.sentTo }}</span>
        </div>
        <div class="message-preview">{{ messagePreview }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Send, Mail } from 'lucide-vue-next'
import type { SentMessage } from '@/stores/messages'

const props = defineProps<{
  sentMessage: SentMessage
  isSelected: boolean
}>()

defineEmits<{
  click: []
}>()

const formattedTime = computed(() => {
  const date = new Date(props.sentMessage.timestamp)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 24) {
    return date.toLocaleTimeString('ro-RO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  } else if (diffInHours < 7 * 24) {
    return date.toLocaleDateString('ro-RO', { 
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  } else {
    return date.toLocaleDateString('ro-RO', { 
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
})

const messagePreview = computed(() => {
  // Strip HTML tags and get first 80 characters
  const text = props.sentMessage.message.replace(/<[^>]*>/g, '').trim()
  return text.length > 80 ? text.substring(0, 80) + '...' : text
})
</script>

<style scoped>
.sent-message-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.sent-message-item:hover {
  background: #f8f9fa;
}

.sent-message-item.selected {
  background: rgba(52, 209, 134, 0.1);
  border-left: 4px solid #34d186;
  padding-left: calc(1rem - 4px);
}

.message-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.message-icon .icon {
  width: 20px;
  height: 20px;
  color: white;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.message-subject {
  font-weight: 600;
  color: #1a1a1a;
  line-height: 1.3;
  word-break: break-word;
  flex: 1;
}

.message-time {
  font-size: 0.75rem;
  color: #666;
  white-space: nowrap;
  flex-shrink: 0;
}

.message-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.message-recipient {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  color: #007bff;
  font-weight: 500;
}

.recipient-icon {
  width: 12px;
  height: 12px;
}

.message-preview {
  font-size: 0.8rem;
  color: #666;
  line-height: 1.4;
  word-break: break-word;
}

@media (max-width: 768px) {
  .sent-message-item {
    padding: 0.75rem;
    gap: 0.5rem;
  }
  
  .message-icon {
    width: 35px;
    height: 35px;
  }
  
  .message-icon .icon {
    width: 18px;
    height: 18px;
  }
  
  .message-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
  }
  
  .message-time {
    font-size: 0.7rem;
  }
}
</style>