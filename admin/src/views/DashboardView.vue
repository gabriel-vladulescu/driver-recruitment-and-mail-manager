<template>
  <div class="dashboard">
    <AppSidebar 
      ref="sidebarRef"
      @select-message="handleSelectMessage" 
      @select-inbox-view="handleInboxViewChange" 
    />
    <MessageDetail v-if="selectedMessage" />
    <SentMessageDetail v-else-if="selectedSentMessage" />
    <div v-else-if="selectedInboxView" class="inbox-container">
      <InboxEmailDetail 
        v-if="selectedInboxEmail"
        :email="selectedInboxEmail"
        :view="selectedInboxView"
        @email-updated="handleEmailUpdated"
        @email-deleted="handleEmailDeleted"
        @back-to-list="handleBackToList"
      />
      <InboxEmailList 
        v-else
        ref="emailListRef"
        :view="selectedInboxView"
        @select-email="handleSelectEmail"
        @email-updated="handleEmailUpdated"
        @fetch-started="startEmailFetch"
        @fetch-progress="updateEmailFetchProgress"
        @fetch-ended="endEmailFetch"
      />
    </div>
    <div v-else class="empty-state">
      <div class="empty-content">
        <MessageCircle class="empty-icon" />
        <h2>Selectează o categorie sau etichetă</h2>
        <p>Alege o categorie sau etichetă din sidebar pentru a vedea email-urile</p>
      </div>
    </div>
    <!-- Global Email Fetch Loader -->
    <div v-if="isFetchingEmails" class="email-fetch-overlay">
      <div class="fetch-loader">
        <div class="loader-content">
          <div class="spinner"></div>
          <h3>Se preiau email-urile...</h3>
          <div class="progress-info">
            <p>Procesate: {{ fetchProgress.processed }} din {{ fetchProgress.total }}</p>
            <div class="progress-bar">
              <div 
                class="progress-fill" 
                :style="{ width: fetchProgress.percentage + '%' }"
              ></div>
            </div>
            <p class="progress-text">{{ fetchProgress.percentage }}%</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useMessagesStore } from '@/stores/messages'
import { MessageCircle } from 'lucide-vue-next'
import AppSidebar from '@/components/AppSidebar.vue'
import MessageDetail from '@/components/MessageDetail.vue'
import SentMessageDetail from '@/components/SentMessageDetail.vue'
import InboxEmailList from '@/components/InboxEmailList.vue'
import InboxEmailDetail from '@/components/InboxEmailDetail.vue'

// Types from AppSidebar
interface SelectedView {
  type: 'category' | 'label' | 'all' | 'trash'
  id?: number
  data?: any
}

const messagesStore = useMessagesStore()

// State
const selectedInboxView = ref<SelectedView | null>(null)
const selectedInboxEmail = ref<any | null>(null)
const sidebarRef = ref<any | null>(null)
const emailListRef = ref<any | null>(null)

// Email fetch progress state
const isFetchingEmails = ref(false)
const fetchProgress = ref({
  processed: 0,
  total: 0,
  percentage: 0
})

const selectedMessage = computed(() => messagesStore.selectedMessage)
const selectedSentMessage = computed(() => messagesStore.selectedSentMessage)

onMounted(() => {
  messagesStore.fetchMessages()
})

function handleSelectMessage(messageId: string) {
  const message = messagesStore.messages.find(m => m.id === messageId)
  if (message) {
    messagesStore.selectMessage(message)
    // Clear inbox selections
    selectedInboxView.value = null
    selectedInboxEmail.value = null
  }
}

function handleInboxViewChange(view: SelectedView) {
  selectedInboxView.value = view
  // Clear other selections
  messagesStore.selectMessage(null)
  messagesStore.selectSentMessage(null)
  selectedInboxEmail.value = null
}

function handleSelectEmail(email: any) {
  selectedInboxEmail.value = email
}

function handleBackToList() {
  selectedInboxEmail.value = null
}

async function handleEmailUpdated() {
  // Trigger refresh of sidebar inbox counts
  if (sidebarRef.value) {
    await sidebarRef.value.refreshInboxData()
  }
}

async function handleEmailDeleted(emailId: number) {
  // Clear selection if the deleted email was selected
  if (selectedInboxEmail.value?.id === emailId) {
    selectedInboxEmail.value = null
  }
  
  // Refresh both email list and sidebar counts
  if (emailListRef.value) {
    await emailListRef.value.refreshEmails()
  }
  if (sidebarRef.value) {
    await sidebarRef.value.refreshInboxData()
  }
}

// Global email fetch handler with progress
function startEmailFetch() {
  isFetchingEmails.value = true
  fetchProgress.value = { processed: 0, total: 0, percentage: 0 }
}

function updateEmailFetchProgress(processed: number, total: number) {
  fetchProgress.value.processed = processed
  fetchProgress.value.total = total
  fetchProgress.value.percentage = total > 0 ? Math.round((processed / total) * 100) : 0
}

function endEmailFetch() {
  isFetchingEmails.value = false
  fetchProgress.value = { processed: 0, total: 0, percentage: 0 }
}

// Expose fetch control methods
defineExpose({
  startEmailFetch,
  updateEmailFetchProgress,
  endEmailFetch
})
</script>

<style scoped>
.dashboard {
  display: flex;
  height: 100vh;
  width: 100%;
  background: #f8f9fa;
  overflow: hidden;
}

.inbox-container {
  flex: 1;
  height: 100vh;
  overflow: hidden;
}

/* Email Fetch Loader Styles */
.email-fetch-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.fetch-loader {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  text-align: center;
  min-width: 400px;
}

.loader-content h3 {
  margin: 0 0 1.5rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.spinner {
  width: 60px;
  height: 60px;
  border: 4px solid #f0f0f0;
  border-top: 4px solid #34d186;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 1.5rem auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.progress-info {
  margin-top: 1.5rem;
}

.progress-info p {
  margin: 0.5rem 0;
  color: #666;
  font-size: 1rem;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #34d186, #28a745);
  transition: width 0.3s ease;
  border-radius: 6px;
}

.progress-text {
  font-size: 1.1rem;
  font-weight: 600;
  color: #34d186;
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