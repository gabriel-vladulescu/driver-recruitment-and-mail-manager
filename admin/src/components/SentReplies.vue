<template>
  <div class="sent-replies">
    <div class="section-header">
      <h3 class="section-title">
        <Send class="section-icon" />
        Reply-uri Trimise
        <span v-if="replies.length > 0" class="replies-count">{{ replies.length }}</span>
      </h3>
      <button @click="refreshReplies" :disabled="loading" class="refresh-btn">
        <RotateCcw class="refresh-icon" :class="{ spinning: loading }" />
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <Loader class="loading-icon spinning" />
      <span>Se încarcă reply-urile...</span>
    </div>

    <div v-else-if="error" class="error-state">
      <AlertCircle class="error-icon" />
      <span>{{ error }}</span>
      <button @click="refreshReplies" class="retry-btn">
        <RotateCcw class="retry-icon" />
        Încearcă din nou
      </button>
    </div>

    <div v-else-if="replies.length === 0" class="empty-state">
      <Mail class="empty-icon" />
      <span>Nu au fost trimise reply-uri pentru acest mesaj</span>
    </div>

    <div v-else class="replies-list">
      <div 
        v-for="reply in replies" 
        :key="reply.id"
        class="reply-card"
        :class="{ expanded: expandedReply === reply.id }"
      >
        <div class="reply-header" @click="toggleReply(reply.id)">
          <div class="reply-info">
            <div class="reply-subject">{{ reply.subject }}</div>
            <div class="reply-meta">
              <span class="reply-to">
                <Mail class="meta-icon" />
                {{ reply.sentTo }}
              </span>
              <span class="reply-time">
                <Clock class="meta-icon" />
                {{ formatDate(reply.timestamp) }}
              </span>
            </div>
          </div>
          <div class="reply-actions">
            <ChevronDown 
              class="expand-icon" 
              :class="{ rotated: expandedReply === reply.id }"
            />
          </div>
        </div>

        <div v-if="expandedReply === reply.id" class="reply-content">
          <div class="reply-message">
            <h4 class="content-title">Mesaj:</h4>
            <div class="message-text" v-html="reply.message"></div>
          </div>
          
          <div v-if="reply.signature" class="reply-signature">
            <h4 class="content-title">Semnătură:</h4>
            <div class="signature-text">{{ reply.signature }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {
  Send,
  RotateCcw,
  Loader,
  AlertCircle,
  Mail,
  Clock,
  ChevronDown
} from 'lucide-vue-next'

interface SentReply {
  id: string
  originalFormId: string | null
  subject: string
  sentTo: string
  message: string
  signature: string | null
  sentByUserId: string
  timestamp: string
}

const props = defineProps<{
  formId?: string
}>()

const replies = ref<SentReply[]>([])
const loading = ref(false)
const error = ref('')
const expandedReply = ref<string | null>(null)

const repliesCount = computed(() => replies.value.length)

async function fetchReplies() {
  if (!props.formId) {
    replies.value = []
    return
  }

  loading.value = true
  error.value = ''

  try {
    const token = localStorage.getItem('admin_token')
    if (!token) {
      throw new Error('Nu sunteți autentificat')
    }

    const url = new URL('http://localhost:4000/api/email/sent-replies')
    url.searchParams.append('formId', props.formId)

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()

    if (response.ok && result.success) {
      replies.value = result.data
    } else {
      throw new Error(result.message || 'Eroare la încărcarea reply-urilor')
    }
  } catch (err: any) {
    console.error('Error fetching sent replies:', err)
    error.value = err.message
  } finally {
    loading.value = false
  }
}

function refreshReplies() {
  fetchReplies()
}

function toggleReply(replyId: string) {
  expandedReply.value = expandedReply.value === replyId ? null : replyId
}

function formatDate(timestamp: string): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Bucharest'
  })
}

onMounted(() => {
  fetchReplies()
})

// Watch for formId changes
import { watch } from 'vue'
watch(() => props.formId, () => {
  expandedReply.value = null
  fetchReplies()
})
</script>

<style scoped>
.sent-replies {
  margin-top: 2rem;
}

.section-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 1rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
  flex: 1;
}

.section-icon {
  width: 20px;
  height: 20px;
  color: #34d186;
}

.replies-count {
  background: #34d186;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.refresh-btn {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover:not(:disabled) {
  border-color: #34d186;
  color: #34d186;
}

.refresh-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-icon {
  width: 16px;
  height: 16px;
}

.loading-state,
.error-state,
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 2rem;
  text-align: center;
  color: #666;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.loading-icon,
.error-icon,
.empty-icon {
  width: 24px;
  height: 24px;
}

.error-state {
  color: #dc3545;
}

.error-icon {
  color: #dc3545;
}

.retry-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  font-size: 0.9rem;
}

.retry-btn:hover {
  background: #c82333;
}

.retry-icon {
  width: 14px;
  height: 14px;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.replies-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.reply-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s;
}

.reply-card:hover {
  border-color: #34d186;
  box-shadow: 0 2px 8px rgba(52, 209, 134, 0.1);
}

.reply-card.expanded {
  border-color: #34d186;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.reply-header:hover {
  background: #f8f9fa;
}

.reply-info {
  flex: 1;
  min-width: 0;
}

.reply-subject {
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.reply-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.reply-to,
.reply-time {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: #666;
}

.meta-icon {
  width: 14px;
  height: 14px;
}

.reply-actions {
  display: flex;
  align-items: center;
}

.expand-icon {
  width: 18px;
  height: 18px;
  color: #666;
  transition: transform 0.3s;
}

.expand-icon.rotated {
  transform: rotate(180deg);
}

.reply-content {
  border-top: 1px solid #e0e0e0;
  padding: 1rem;
  background: #f8f9fa;
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    max-height: 0;
  }
  to {
    opacity: 1;
    max-height: 500px;
  }
}

.reply-message,
.reply-signature {
  margin-bottom: 1rem;
}

.reply-signature {
  margin-bottom: 0;
}

.content-title {
  font-size: 0.9rem;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 0.5rem 0;
}

.message-text {
  line-height: 1.6;
  color: #1a1a1a;
  word-break: break-word;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

.signature-text {
  line-height: 1.6;
  color: #666;
  font-style: italic;
  white-space: pre-wrap;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .section-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }
  
  .refresh-btn {
    align-self: flex-end;
  }
  
  .reply-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .reply-header {
    padding: 0.75rem;
  }
  
  .reply-content {
    padding: 0.75rem;
  }
}
</style>