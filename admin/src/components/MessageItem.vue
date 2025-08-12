<template>
  <div 
    class="message-item" 
    :class="{ 
      'unread': !message.isRead, 
      'selected': isSelected
    }"
    @click="$emit('click')"
  >
    <div class="message-icon">
      <component :is="iconComponent" class="icon" />
      <div v-if="!message.isRead" class="unread-dot"></div>
    </div>
    
    <div class="message-content">
      <div class="message-header">
        <h4 class="message-subject">{{ message.subject }}</h4>
        <span class="message-time">{{ formattedTime }}</span>
      </div>
      <p class="message-preview">{{ message.preview_message }}</p>
      <div class="message-meta">
        <span class="message-type" :class="typeClass">{{ typeLabel }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Message } from '@/stores/messages'
import {
  MessageCircle,
  Briefcase,
  Car,
  Mail
} from 'lucide-vue-next'

interface Props {
  message: Message
  isSelected?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false
})

defineEmits<{
  click: []
}>()

const iconComponent = computed(() => {
  const iconMap: Record<string, any> = {
    MessageCircle,
    Briefcase,
    Car,
    Mail
  }
  return iconMap[props.message.icon] || MessageCircle
})

const typeLabel = computed(() => {
  const typeMap: Record<string, string> = {
    'TYPE_CONTACT': 'Contact',
    'TYPE_RECRUITMENT': 'Recrutare',
    'TYPE_EXTERNAL_CAR_RENT': 'Închiriere'
  }
  return typeMap[props.message.type] || 'Mesaj'
})

const typeClass = computed(() => {
  const classMap: Record<string, string> = {
    'TYPE_CONTACT': 'type-contact',
    'TYPE_RECRUITMENT': 'type-recruitment',
    'TYPE_EXTERNAL_CAR_RENT': 'type-rental'
  }
  return classMap[props.message.type] || 'type-default'
})

const formattedTime = computed(() => {
  const date = new Date(props.message.timestamp)
  const now = new Date()
  const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  
  if (diffInHours < 1) {
    const minutes = Math.floor(diffInHours * 60)
    return `${minutes}m`
  } else if (diffInHours < 24) {
    return `${Math.floor(diffInHours)}h`
  } else {
    const days = Math.floor(diffInHours / 24)
    if (days === 1) return '1zi'
    if (days < 7) return `${days}zi`
    return date.toLocaleDateString('ro-RO', { 
      day: 'numeric', 
      month: 'short',
      timeZone: 'Europe/Bucharest'
    })
  }
})
</script>

<style scoped>
.message-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.message-item:hover {
  background: #f8f9fa;
}

.message-item.selected {
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.1) 0%, rgba(40, 167, 69, 0.1) 100%);
  border-right: 4px solid #34d186;
}

.message-item.unread {
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.12) 0%, rgba(40, 167, 69, 0.12) 100%);
  border-left: 4px solid #34d186;
}

.message-item.unread:hover {
  background: linear-gradient(135deg, rgba(52, 209, 134, 0.18) 0%, rgba(40, 167, 69, 0.18) 100%);
}


.message-icon {
  position: relative;
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #e0e0e0;
}

.message-item.unread .message-icon {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-color: #34d186;
}

.message-icon .icon {
  width: 24px;
  height: 24px;
  color: #666;
}

.message-item.unread .message-icon .icon {
  color: white;
}

.unread-dot {
  position: absolute;
  top: -2px;
  right: -2px;
  width: 12px;
  height: 12px;
  background: #dc3545;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 1rem;
}

.message-subject {
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.3;
  word-break: break-word;
  flex: 1;
}

.message-item.unread .message-subject {
  font-weight: 700;
}

.message-time {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  flex-shrink: 0;
}

.message-preview {
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  margin: 0 0 0.75rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-word;
}

.message-item.unread .message-preview {
  color: #555;
  font-weight: 500;
}

.message-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.message-type {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.type-contact {
  background: rgba(52, 209, 134, 0.1);
  color: #34d186;
}

.type-recruitment {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.type-rental {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.type-default {
  background: rgba(107, 114, 128, 0.1);
  color: #6b7280;
}


@media (max-width: 768px) {
  .message-item {
    padding: 0.75rem 1rem;
    gap: 0.75rem;
  }
  
  .message-icon {
    width: 40px;
    height: 40px;
  }
  
  .message-icon .icon {
    width: 20px;
    height: 20px;
  }
  
  .message-header {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }
  
  .message-time {
    align-self: flex-end;
  }
  
  .message-subject {
    font-size: 0.95rem;
  }
  
  .message-preview {
    font-size: 0.85rem;
    -webkit-line-clamp: 1;
  }
  
  .message-meta {
    gap: 0.5rem;
  }
}
</style>