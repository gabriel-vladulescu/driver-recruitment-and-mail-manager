<template>
  <div class="dashboard">
    <AppSidebar @select-message="handleSelectMessage" />
    <MessageDetail v-if="selectedMessage" />
    <SentMessageDetail v-else-if="selectedSentMessage" />
    <div v-else class="empty-state">
      <div class="empty-content">
        <MessageCircle class="empty-icon" />
        <h2>Selectează un mesaj</h2>
        <p>Alege un mesaj din sidebar pentru a vedea detaliile</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useMessagesStore } from '@/stores/messages'
import { MessageCircle } from 'lucide-vue-next'
import AppSidebar from '@/components/AppSidebar.vue'
import MessageDetail from '@/components/MessageDetail.vue'
import SentMessageDetail from '@/components/SentMessageDetail.vue'

const messagesStore = useMessagesStore()

const selectedMessage = computed(() => messagesStore.selectedMessage)
const selectedSentMessage = computed(() => messagesStore.selectedSentMessage)

onMounted(() => {
  messagesStore.fetchMessages()
})

function handleSelectMessage(messageId: string) {
  const message = messagesStore.messages.find(m => m.id === messageId)
  if (message) {
    messagesStore.selectMessage(message)
  }
}
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  width: 100%;
  background: #f8f9fa;
  overflow: hidden;
}

.empty-state {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.empty-content {
  text-align: center;
  max-width: 400px;
}

.empty-icon {
  width: 80px;
  height: 80px;
  color: #ccc;
  margin: 0 auto 2rem;
}

.empty-content h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.empty-content p {
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .dashboard {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  
  .empty-state {
    min-height: 400px;
  }
  
  .empty-icon {
    width: 60px;
    height: 60px;
    margin-bottom: 1.5rem;
  }
  
  .empty-content h2 {
    font-size: 1.3rem;
  }
  
  .empty-content p {
    font-size: 0.9rem;
  }
}
</style>