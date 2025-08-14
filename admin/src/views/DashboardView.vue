<template>
  <div class="dashboard">
    <AppSidebar 
      ref="sidebarRef"
      @select-message="handleSelectMessage" 
      @select-inbox-view="handleInboxViewChange" 
    />
  
    <div v-if="selectedInboxView" class="inbox-container">
      <InboxEmailDetail 
        v-if="selectedInboxEmail"
        :email="selectedInboxEmail"
        :view="selectedInboxView"
        @emailUpdated="handleEmailUpdated"
        @email-deleted="handleEmailDeleted"
        @back-to-list="handleBackToList"
      />
      <InboxEmailList 
        v-else
        ref="emailListRef"
        :view="selectedInboxView"
        @select-email="handleSelectEmail"
        @emailUpdated="handleEmailUpdated"
        @paginationUpdated="handlePaginationUpdated"
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
import { onMounted, computed, ref, watch } from 'vue'
import { useMessagesStore } from '@/stores/messages'
import { useEmailStore } from '@/stores/emailStore'
import { MessageCircle } from 'lucide-vue-next'
import AppSidebar from '@/components/AppSidebar.vue'
import InboxEmailList from '@/components/InboxEmailList.vue'
import InboxEmailDetail from '@/components/InboxEmailDetail.vue'
import '@/assets/dashboard.css'

// Types from AppSidebar
interface SelectedView {
  type: 'category' | 'label' | 'all' | 'trash'
  id?: string | number
  data?: any
}

const messagesStore = useMessagesStore()
const emailStore = useEmailStore()

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

})

function handleSelectMessage(messageId: string) {
  const message = messagesStore.messages.find(m => m.id === messageId)
  if (message) {
    selectedInboxView.value = null
    selectedInboxEmail.value = null
  }
}

function handleInboxViewChange(view: SelectedView) {
  selectedInboxView.value = view
  selectedInboxEmail.value = null
}

function handleSelectEmail(email: any) {
  selectedInboxEmail.value = email
}

function handleBackToList() {
  selectedInboxEmail.value = null
}

function handlePaginationUpdated(pagination: any, view: any) {
  // Update sidebar with current view pagination data
  if (sidebarRef.value) {
    sidebarRef.value.updateViewCounts(view, pagination)
  }
}

async function handleEmailUpdated() {
  // Small delay to ensure database transaction is committed
  await new Promise(resolve => setTimeout(resolve, 100))
  
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

// Watch for email updates from store to refresh sidebar
watch(() => emailStore.updateTrigger, async () => {
  // Use existing handleEmailUpdated function to refresh sidebar counts
  await handleEmailUpdated();
})

// Expose fetch control methods
defineExpose({
  startEmailFetch,
  updateEmailFetchProgress,
  endEmailFetch
})
</script>