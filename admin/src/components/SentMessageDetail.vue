<template>
  <div class="sent-message-detail">
    <div class="detail-header">
      <div class="header-content">
        <div class="message-info">
          <div class="message-icon">
            <Send class="icon" />
          </div>
          <div class="message-meta">
            <h1 class="message-subject">{{ sentMessage.subject }}</h1>
            <div class="message-recipient">
              <span class="recipient-label">Trimis către:</span>
              <span class="recipient-value">{{ sentMessage.sentTo }}</span>
            </div>
          </div>
        </div>
        
        <div class="header-actions">
          <button @click="closeDetail" class="action-btn close-btn">
            <X class="btn-icon" />
            Închide
          </button>
        </div>
      </div>
      
      <div class="status-bar">
        <div class="status-badges">
          <span class="status-badge sent">
            <Send class="status-icon" />
            Mesaj Trimis
          </span>
          <span v-if="sentMessage.originalFormId" class="status-badge reply">
            <Reply class="status-icon" />
            Reply la mesaj #{{ sentMessage.originalFormId }}
          </span>
        </div>
        <span class="message-time">{{ formattedDate }}</span>
      </div>
    </div>

    <div class="detail-content">
      <div class="details-grid">
        <!-- Message Content -->
        <div class="detail-section message-section">
          <h3 class="section-title">
            <FileText class="section-icon" />
            Conținut Mesaj
          </h3>
          <div class="message-content" v-html="sentMessage.message"></div>
        </div>

        <!-- Signature Section -->
        <div v-if="sentMessage.signature" class="detail-section signature-section">
          <h3 class="section-title">
            <Edit class="section-icon" />
            Semnătură
          </h3>
          <div class="signature-content">{{ sentMessage.signature }}</div>
        </div>

        <!-- Technical Details -->
        <div class="detail-section tech-section">
          <h3 class="section-title">
            <Info class="section-icon" />
            Detalii Tehnice
          </h3>
          <div class="tech-info">
            <div class="tech-item">
              <span class="tech-label">ID Mesaj:</span>
              <span class="tech-value">{{ sentMessage.id }}</span>
            </div>
            <div v-if="sentMessage.originalFormId" class="tech-item">
              <span class="tech-label">ID Formular Original:</span>
              <span class="tech-value">{{ sentMessage.originalFormId }}</span>
            </div>
            <div class="tech-item">
              <span class="tech-label">Trimis de utilizatorul:</span>
              <span class="tech-value">{{ sentMessage.sentByUserId }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useMessagesStore } from '@/stores/messages'
import {
  Send,
  X,
  Reply,
  FileText,
  Edit,
  Info
} from 'lucide-vue-next'

const messagesStore = useMessagesStore()

const sentMessage = computed(() => messagesStore.selectedSentMessage!)

const formattedDate = computed(() => {
  if (!sentMessage.value) return ''
  
  const date = new Date(sentMessage.value.timestamp)
  return date.toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Bucharest'
  })
})

function closeDetail() {
  messagesStore.clearSelection()
}
</script>

<style scoped>
.sent-message-detail {
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  min-width: 0;
  overflow: hidden;
}

.detail-header {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-bottom: 1px solid #e0e0e0;
  padding: 1.5rem 2rem;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  margin-bottom: 1rem;
}

.message-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
}

.message-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

.message-icon .icon {
  width: 30px;
  height: 30px;
  color: white;
}

.message-meta {
  flex: 1;
  min-width: 0;
}

.message-subject {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 0.5rem 0;
  line-height: 1.3;
  word-break: break-word;
}

.message-recipient {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.recipient-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.recipient-value {
  font-size: 0.9rem;
  color: #007bff;
  font-weight: 600;
}

.header-actions {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  flex-shrink: 0;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #666;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.close-btn:hover {
  border-color: #dc3545;
  color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.btn-icon {
  width: 16px;
  height: 16px;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.status-badges {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.status-badge {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.sent {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
}

.status-badge.reply {
  background: rgba(52, 209, 134, 0.1);
  color: #34d186;
}

.status-icon {
  width: 12px;
  height: 12px;
}

.message-time {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.detail-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.details-grid {
  display: grid;
  gap: 2rem;
  max-width: 800px;
}

.detail-section {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0 0 1.5rem 0;
}

.section-icon {
  width: 20px;
  height: 20px;
  color: #007bff;
}

.message-content {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  line-height: 1.6;
  color: #1a1a1a;
  word-break: break-word;
}

.signature-content {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  line-height: 1.6;
  color: #666;
  font-style: italic;
  white-space: pre-wrap;
}

.tech-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.tech-label {
  font-weight: 500;
  color: #666;
}

.tech-value {
  font-weight: 600;
  color: #1a1a1a;
  font-family: monospace;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .sent-message-detail {
    height: auto;
    min-height: 50vh;
  }

  .detail-header {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }
  
  .message-info {
    gap: 0.75rem;
  }
  
  .message-icon {
    width: 50px;
    height: 50px;
  }
  
  .message-icon .icon {
    width: 24px;
    height: 24px;
  }
  
  .message-subject {
    font-size: 1.25rem;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .action-btn {
    flex: 1;
    justify-content: center;
  }
  
  .detail-content {
    padding: 1rem;
    flex: none;
  }
  
  .tech-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>