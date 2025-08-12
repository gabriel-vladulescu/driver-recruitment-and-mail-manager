<template>
  <div class="message-detail">
    <div class="detail-header">
      <div class="header-content">
        <div class="message-info">
          <div class="message-icon">
            <component :is="iconComponent" class="icon" />
          </div>
          <div class="message-meta">
            <h1 class="message-subject">{{ selectedMessage?.subject }}</h1>
            <div class="message-from">
              <span class="from-label">De la:</span>
              <span class="from-value">{{ messageDetails?.from }}</span>
            </div>
          </div>
        </div>
        
        <div class="header-actions">
          <button 
            v-if="selectedMessage && selectedMessage.isRead"
            @click="markAsUnread"
            class="action-btn unread-btn"
            :disabled="actionLoading"
          >
            <Mail class="btn-icon" />
            Marchează necitit
          </button>
          
          <button 
            v-if="messageDetails?.contact?.email"
            @click="replyToEmail"
            class="action-btn reply-btn"
            :disabled="actionLoading"
          >
            <Reply class="btn-icon" />
            Reply
          </button>

          <button 
            @click="deleteMessage"
            class="action-btn delete-btn"
            :disabled="actionLoading"
          >
            <Archive class="btn-icon" />
            Șterge
          </button>
          
          <button @click="closeDetail" class="action-btn close-btn">
            <X class="btn-icon" />
            Închide
          </button>
        </div>
      </div>
      
      <div class="status-bar">
        <div class="status-badges">
          <span class="status-badge" :class="typeClass">
            {{ typeLabel }}
          </span>
          <span v-if="selectedMessage && !selectedMessage.isRead" class="status-badge unread">
            <Circle class="status-icon" />
            Necitit
          </span>
          <span v-if="messageDetails?.contact?.email" class="status-badge email-available">
            <Mail class="status-icon" />
            Email disponibil pentru reply
          </span>
        </div>
        <span class="message-time">{{ formattedDate }}</span>
      </div>
    </div>

    <div class="detail-content">
      <div v-if="messagesStore.loading" class="loading-state">
        <Loader class="loading-icon spinning" />
        <span>Se încarcă detaliile...</span>
      </div>
      
      <div v-else-if="messagesStore.error" class="error-state">
        <AlertCircle class="error-icon" />
        <span>{{ messagesStore.error }}</span>
      </div>
      
      <div v-else-if="messageDetails" class="details-grid">
        <!-- Contact Information -->
        <div class="detail-section contact-section">
          <h3 class="section-title">
            <User class="section-icon" />
            Informații Contact
          </h3>
          <div class="contact-info">
            <div v-if="messageDetails.contact.email" class="contact-item">
              <Mail class="contact-icon" />
              <div class="contact-details">
                <span class="contact-label">Email</span>
                <a :href="`mailto:${messageDetails.contact.email}`" class="contact-value email">
                  {{ messageDetails.contact.email }}
                </a>
              </div>
            </div>
            <div v-if="messageDetails.contact.phone" class="contact-item">
              <Phone class="contact-icon" />
              <div class="contact-details">
                <span class="contact-label">Telefon</span>
                <a :href="`tel:${messageDetails.contact.phone}`" class="contact-value phone">
                  {{ messageDetails.contact.phone }}
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Details -->
        <div class="detail-section message-section">
          <h3 class="section-title">
            <FileText class="section-icon" />
            Detalii Mesaj
          </h3>
          <div class="message-data">
            <div 
              v-for="item in messageDetails.data" 
              :key="item.title"
              class="data-item"
              :class="{ 'long-content': item.info.length > 100 }"
            >
              <div class="data-label">{{ item.title }}</div>
              <div class="data-value">{{ item.info }}</div>
            </div>
          </div>
        </div>
        
        <!-- Sent Replies Section -->
        <SentReplies :form-id="selectedMessage?.id" />
      </div>
    </div>

    <!-- Email Composer -->
    <EmailComposer
      :is-visible="showEmailComposer"
      :recipient-email="messageDetails?.contact?.email || ''"
      :original-subject="selectedMessage?.subject || ''"
      :original-message="getOriginalMessageText()"
      @close="closeEmailComposer"
      @send="handleEmailSend"
    />

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      :is-visible="showDeleteDialog"
      type="danger"
      title="Șterge Mesaj"
      :message="`Sigur doriți să ștergeți acest mesaj?`"
      :details="selectedMessage?.subject"
      confirm-text="Șterge"
      cancel-text="Anulează"
      :loading="actionLoading"
      @confirm="confirmDelete"
      @cancel="closeDeleteDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMessagesStore } from '@/stores/messages'
import { useToastStore } from '@/stores/toast'
import EmailComposer from './EmailComposer.vue'
import SentReplies from './SentReplies.vue'
import ConfirmDialog from './ConfirmDialog.vue'
import {
  MessageCircle,
  Briefcase,
  Car,
  Mail,
  Archive,
  X,
  Circle,
  User,
  Phone,
  FileText,
  Loader,
  AlertCircle,
  Reply
} from 'lucide-vue-next'

const messagesStore = useMessagesStore()
const toastStore = useToastStore()
const actionLoading = ref(false)
const showEmailComposer = ref(false)
const showDeleteDialog = ref(false)

const selectedMessage = computed(() => messagesStore.selectedMessage)
const messageDetails = computed(() => messagesStore.selectedMessageDetails)

const iconComponent = computed(() => {
  if (!selectedMessage.value) return MessageCircle
  
  const iconMap: Record<string, any> = {
    MessageCircle,
    Briefcase,
    Car,
    Mail
  }
  return iconMap[selectedMessage.value.icon] || MessageCircle
})

const typeLabel = computed(() => {
  if (!selectedMessage.value) return 'Mesaj'
  
  const typeMap: Record<string, string> = {
    'TYPE_CONTACT': 'Contact',
    'TYPE_RECRUITMENT': 'Recrutare',
    'TYPE_EXTERNAL_CAR_RENT': 'Închiriere'
  }
  return typeMap[selectedMessage.value.type] || 'Mesaj'
})

const typeClass = computed(() => {
  if (!selectedMessage.value) return 'type-default'
  
  const classMap: Record<string, string> = {
    'TYPE_CONTACT': 'type-contact',
    'TYPE_RECRUITMENT': 'type-recruitment',
    'TYPE_EXTERNAL_CAR_RENT': 'type-rental'
  }
  return classMap[selectedMessage.value.type] || 'type-default'
})

const formattedDate = computed(() => {
  if (!selectedMessage.value) return ''
  
  const date = new Date(selectedMessage.value.timestamp)
  return date.toLocaleDateString('ro-RO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Bucharest'
  })
})

async function markAsUnread() {
  if (!selectedMessage.value || actionLoading.value) return
  
  actionLoading.value = true
  try {
    await messagesStore.markAsRead(selectedMessage.value.id, false)
  } catch (error) {
    console.error('Error marking as unread:', error)
  } finally {
    actionLoading.value = false
  }
}

function deleteMessage() {
  if (!selectedMessage.value || actionLoading.value) return
  showDeleteDialog.value = true
}

async function confirmDelete() {
  if (!selectedMessage.value) return
  
  actionLoading.value = true
  try {
    await messagesStore.deleteMessage(selectedMessage.value.id)
    showDeleteDialog.value = false
  } catch (error) {
    console.error('Error deleting message:', error)
  } finally {
    actionLoading.value = false
  }
}

function closeDeleteDialog() {
  showDeleteDialog.value = false
}

function replyToEmail() {
  if (!messageDetails.value?.contact?.email) return
  showEmailComposer.value = true
}

function closeEmailComposer() {
  showEmailComposer.value = false
}

function getOriginalMessageText(): string {
  if (!messageDetails.value) return ''
  
  const data = messageDetails.value.data
  const messageField = data.find(item => 
    item.title.toLowerCase().includes('mesaj') || 
    item.title.toLowerCase().includes('message') ||
    item.title.toLowerCase().includes('informații')
  )
  
  return messageField?.info || data.map(item => `${item.title}: ${item.info}`).join('\n')
}

async function handleEmailSend(emailData: {
  to: string
  subject: string
  content: string
  signature: string
}) {
  try {
    // Get auth token from localStorage
    const token = localStorage.getItem('admin_token')
    if (!token) {
      toastStore.error('Nu sunteți autentificat. Vă rugăm să vă conectați din nou.')
      return
    }

    const response = await fetch('http://localhost:4000/api/email/reply', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        to: emailData.to,
        subject: emailData.subject,
        content: emailData.content,
        signature: emailData.signature,
        replyTo: selectedMessage.value?.id
      })
    })

    const result = await response.json()

    if (response.ok && result.success) {
      toastStore.success(`Email trimis cu succes către ${emailData.to}!`)
      showEmailComposer.value = false
      
      // Trigger refresh of sent replies by emitting an event or using a ref
      // The SentReplies component will automatically refresh since it watches formId
      // We could also emit a custom event here if needed
    } else {
      throw new Error(result.message || 'Eroare la trimiterea email-ului')
    }
  } catch (error: any) {
    console.error('Error sending email:', error)
    toastStore.error(`Eroare la trimiterea email-ului: ${error.message}`)
  }
}

function closeDetail() {
  messagesStore.clearSelection()
}
</script>

<style scoped>
.message-detail {
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
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(52, 209, 134, 0.3);
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

.message-from {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.from-label {
  font-size: 0.9rem;
  color: #666;
  font-weight: 500;
}

.from-value {
  font-size: 0.9rem;
  color: #34d186;
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

.action-btn:hover:not(:disabled) {
  border-color: #34d186;
  color: #34d186;
  box-shadow: 0 0 0 2px rgba(52, 209, 134, 0.1);
}

.action-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.unread-btn:hover:not(:disabled) {
  border-color: #ffc107;
  color: #ffc107;
  box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.1);
}

.delete-btn:hover:not(:disabled) {
  border-color: #dc3545;
  color: #dc3545;
  box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.1);
}

.reply-btn:hover:not(:disabled) {
  border-color: #007bff;
  color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.close-btn:hover:not(:disabled) {
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

.status-badge.type-contact {
  background: rgba(52, 209, 134, 0.1);
  color: #34d186;
}

.status-badge.type-recruitment {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
}

.status-badge.type-rental {
  background: rgba(245, 101, 101, 0.1);
  color: #f56565;
}

.status-badge.unread {
  background: rgba(255, 193, 7, 0.1);
  color: #ffc107;
}


.status-badge.email-available {
  background: rgba(0, 123, 255, 0.1);
  color: #007bff;
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

.loading-state,
.error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 200px;
  color: #666;
}

.loading-icon,
.error-icon {
  width: 32px;
  height: 32px;
}

.error-state {
  color: #dc3545;
}

.error-icon {
  color: #dc3545;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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
  color: #34d186;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.contact-icon {
  width: 20px;
  height: 20px;
  color: #34d186;
  flex-shrink: 0;
}

.contact-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.contact-label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.contact-value {
  font-size: 1rem;
  color: #1a1a1a;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s;
}

.contact-value.email:hover,
.contact-value.phone:hover {
  color: #34d186;
}

.message-data {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.data-item {
  padding: 1rem;
  background: white;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.data-item.long-content {
  border-left: 4px solid #34d186;
}

.data-label {
  font-size: 0.8rem;
  color: #666;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
}

.data-value {
  font-size: 1rem;
  color: #1a1a1a;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
}

@media (max-width: 768px) {
  .message-detail {
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
    flex-wrap: wrap;
    width: 100%;
  }
  
  .action-btn {
    flex: 1;
    min-width: 0;
    justify-content: center;
  }
  
  .detail-content {
    padding: 1rem;
    overflow-y: auto;
    flex: none;
  }
  
  .contact-item {
    padding: 0.75rem;
  }
  
  .data-item {
    padding: 0.75rem;
  }
}
</style>