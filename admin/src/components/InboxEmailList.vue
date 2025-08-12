<template>
  <div class="inbox-email-list">
    <!-- Header -->
    <div class="list-header">
      <div class="header-info">
        <div class="header-icon">
          <Mail v-if="view.type === 'category' && view.data?.category === 'EMAILS_RECEIVED'" />
          <Send v-else-if="view.type === 'category' && view.data?.category === 'EMAILS_SENT'" />
          <Tag v-else-if="view.type === 'label'" />
          <Trash2 v-else-if="view.type === 'trash'" />
          <Inbox v-else />
        </div>
        <div class="header-text">
          <h2>{{ getViewTitle() }}</h2>
          <p v-if="emails.length > 0">{{ emails.length }} email{{ emails.length !== 1 ? '-uri' : '' }}</p>
        </div>
      </div>
      
      <div class="header-actions">
        <template v-if="view.type === 'trash'">
          <!-- Trash bulk actions -->
          <button @click="fetchEmails" class="refresh-btn" :disabled="loading">
            <RefreshCw class="refresh-icon" :class="{ spinning: loading }" />
          </button>
          <button 
            @click="toggleSelectAll" 
            class="select-all-btn"
            :disabled="emails.length === 0"
          >
            {{ selectedEmailIds.length === emails.length && emails.length > 0 ? 'Deselectează tot' : 'Selectează tot' }}
          </button>
          <button 
            @click="showBulkDeleteConfirm" 
            class="bulk-delete-btn"
            :disabled="selectedEmailIds.length === 0"
          >
            <Trash2 class="delete-icon" />
            Șterge selectate ({{ selectedEmailIds.length }})
          </button>
        </template>
        <template v-else>
          <!-- Normal actions -->
          <button @click="fetchEmails" class="refresh-btn" :disabled="loading">
            <RefreshCw class="refresh-icon" :class="{ spinning: loading }" />
          </button>
          <button 
            v-if="view.type === 'category' && view.data?.category === 'EMAILS_RECEIVED'"
            @click="fetchEmailsFromServer" 
            class="fetch-btn"
            :disabled="fetchingFromServer"
          >
            <Download class="download-icon" />
            {{ fetchingFromServer ? 'Preluare...' : 'Preia Email-uri' }}
          </button>
        </template>
      </div>
    </div>

    <!-- Search Bar -->
    <div class="search-section">
      <div class="search-input-group">
        <Search class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Caută în email-uri..."
          class="search-input"
          @input="debouncedSearch"
        />
        <button v-if="searchQuery" @click="clearSearch" class="clear-search">
          <X class="clear-icon" />
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading && emails.length === 0" class="loading-state">
      <Loader class="loading-icon spinning" />
      <p>Se încarcă email-urile...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <AlertCircle class="error-icon" />
      <p>{{ error }}</p>
      <button @click="fetchEmails" class="retry-btn">Încearcă din nou</button>
    </div>

    <!-- Empty State -->
    <div v-else-if="emails.length === 0" class="empty-state">
      <Mail class="empty-icon" />
      <h3>Nu există email-uri</h3>
      <p v-if="view.type === 'category'">Nu au fost găsite email-uri în această categorie.</p>
      <p v-else>Nu au fost găsite email-uri cu această etichetă.</p>
    </div>

    <!-- Email List -->
    <div v-else class="emails-container">
      <div 
        v-for="email in emails" 
        :key="email.id"
        class="email-item"
        :class="{ 'unread': !email.is_read, 'selected': selectedEmailId === email.id }"
        @click="selectEmail(email)"
      >
        <div class="email-indicator">
          <div class="status-dot" :class="{ 'unread': !email.is_read }"></div>
        </div>
        
        <div class="email-content">
          <div class="email-header">
            <div class="sender-info">
              <span class="sender-name">{{ formatSenderName(email) }}</span>
            </div>
            <div class="email-meta">
              <div class="inbox-type-badge" v-if="email.inboxType">
                <span class="inbox-type-text">{{ email.inboxType.name }}</span>
              </div>
              <span class="email-date">{{ formatDate(email.createdAt) }}</span>
              <div v-if="email.inboxLabel" class="email-label">
                <div 
                  class="label-indicator" 
                  :style="{ backgroundColor: email.inboxLabel.color }"
                ></div>
                <span>{{ email.inboxLabel.label }}</span>
              </div>
            </div>
          </div>
          
          <div class="email-body">
            <h4 class="email-subject">{{ email.subject || 'Fără subiect' }}</h4>
            <p class="email-preview">{{ getEmailPreview(email.message) }}</p>
          </div>
        </div>
        
        <div class="email-actions">
          <template v-if="view.type === 'trash'">
            <!-- Trash-specific actions -->
            <input 
              type="checkbox" 
              :checked="selectedEmailIds.includes(email.id)"
              @click.stop
              @change="toggleEmailSelection(email.id)"
              class="email-checkbox"
            />
            <button 
              @click.stop="restoreEmail(email)" 
              class="action-btn restore-btn"
              title="Restaurează email-ul"
            >
              <RotateCcw class="action-icon" />
            </button>
            <button 
              @click.stop="showPermanentDeleteConfirm(email)" 
              class="action-btn delete-btn"
              title="Șterge definitiv"
            >
              <Trash2 class="action-icon" />
            </button>
          </template>
          <template v-else>
            <!-- Normal email actions -->
            <button 
              @click.stop="toggleReadStatus(email)" 
              class="action-btn"
              :title="email.is_read ? 'Marchează ca necitit' : 'Marchează ca citit'"
            >
              <MailOpen v-if="email.is_read" class="action-icon" />
              <Mail v-else class="action-icon" />
            </button>
            <button 
              @click.stop="showLabelModal(email)" 
              class="action-btn"
              title="Setează etichetă"
            >
              <Tag class="action-icon" />
            </button>
          </template>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="pagination">
      <button 
        @click="previousPage" 
        :disabled="currentPage === 1"
        class="page-btn"
      >
        <ChevronLeft class="page-icon" />
      </button>
      
      <span class="page-info">
        Pagina {{ currentPage }} din {{ totalPages }}
      </span>
      
      <button 
        @click="nextPage" 
        :disabled="currentPage === totalPages"
        class="page-btn"
      >
        <ChevronRight class="page-icon" />
      </button>
    </div>

    <!-- Label Assignment Modal -->
    <div v-if="showingLabelModal" class="modal-overlay" @click="closeLabelModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>Setează Eticheta</h3>
          <button @click="closeLabelModal" class="close-btn">
            <X class="close-icon" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="label-options">
            <div 
              class="label-option"
              :class="{ selected: !selectedLabelId }"
              @click="selectedLabelId = null"
            >
              <div class="option-content">
                <X class="remove-icon" />
                <span>Fără etichetă</span>
              </div>
            </div>
            
            <div 
              v-for="label in availableLabels" 
              :key="label.id"
              class="label-option"
              :class="{ selected: selectedLabelId === label.id }"
              @click="selectedLabelId = label.id"
            >
              <div class="option-content">
                <div class="label-indicator" :style="{ backgroundColor: label.color }"></div>
                <component :is="label.icon" class="label-icon" />
                <span>{{ label.label }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeLabelModal" class="btn-cancel">Anulează</button>
          <button @click="assignLabel" class="btn-save">Aplică</button>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Dialogs -->
    <ConfirmDialog
      :is-visible="showDeleteDialog"
      type="danger"
      title="Șterge Definitiv Email"
      message="Sigur dorești să ștergi definitiv acest email? Această acțiune nu poate fi anulată."
      :details="emailToDelete?.subject"
      confirm-text="Șterge Definitiv"
      cancel-text="Anulează"
      :loading="isDeleting"
      @confirm="confirmPermanentDelete"
      @cancel="closeDeleteDialog"
    />

    <ConfirmDialog
      :is-visible="showBulkDeleteDialog"
      type="danger"
      title="Șterge Definitiv Email-uri"
      :message="`Sigur dorești să ștergi definitiv ${selectedEmailIds.length} email${selectedEmailIds.length > 1 ? '-uri' : ''}? Această acțiune nu poate fi anulată.`"
      confirm-text="Șterge Definitiv"
      cancel-text="Anulează"
      :loading="isDeleting"
      @confirm="confirmBulkDelete"
      @cancel="closeBulkDeleteDialog"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import axios from 'axios'
import {
  Mail, Send, Tag, Inbox, RefreshCw, Download, Search, X, Loader, AlertCircle,
  MailOpen, ChevronLeft, ChevronRight, Briefcase, Bookmark, Star, Heart, Flag, Archive, Trash2, RotateCcw
} from 'lucide-vue-next'
import ConfirmDialog from './ConfirmDialog.vue'

// Props
interface Props {
  view: {
    type: 'category' | 'label' | 'all' | 'trash'
    id?: number
    data?: any
  }
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  selectEmail: [email: any]
  emailUpdated: []
  fetchStarted: []
  fetchProgress: [processed: number, total: number]
  fetchEnded: []
}>()

// State
const emails = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const selectedEmailIds = ref<number[]>([])  // For bulk selection in trash
const showDeleteDialog = ref(false)
const showBulkDeleteDialog = ref(false)
const emailToDelete = ref<any>(null)
const isDeleting = ref(false)
const pageSize = 20
const selectedEmailId = ref<number | null>(null)
const fetchingFromServer = ref(false)

// Label modal state
const showingLabelModal = ref(false)
const selectedEmailForLabel = ref<any | null>(null)
const selectedLabelId = ref<number | null>(null)
const availableLabels = ref<any[]>([])

// Computed
const getViewTitle = () => {
  if (props.view.type === 'category') {
    return props.view.data?.name || 'Categorie'
  } else if (props.view.type === 'label') {
    return props.view.data?.label || 'Etichetă'
  } else if (props.view.type === 'trash') {
    return 'Coș de gunoi'
  }
  return 'Email-uri'
}

// Methods
const fetchEmails = async () => {
  if (loading.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    let url
    
    if (props.view.type === 'trash') {
      url = `http://localhost:4000/api/inbox/trash?page=${currentPage.value}&limit=${pageSize}`
    } else {
      url = `http://localhost:4000/api/inbox/emails?page=${currentPage.value}&limit=${pageSize}`
      
      if (props.view.type === 'category' && props.view.data) {
        url += `&category=${props.view.data.category}`
      } else if (props.view.type === 'label' && props.view.id) {
        url += `&label=${props.view.id}`
      }
    }
    
    if (searchQuery.value) {
      url += `&search=${encodeURIComponent(searchQuery.value)}`
    }
    
    const response = await axios.get(url)
    
    emails.value = response.data.data.emails
    totalPages.value = response.data.data.pagination.totalPages
    
    // Emit update event to refresh sidebar counts
    emit('emailUpdated')
    
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Eroare la încărcarea email-urilor'
  } finally {
    loading.value = false
  }
}

const fetchEmailsFromServer = async () => {
  if (fetchingFromServer.value) return
  
  fetchingFromServer.value = true
  emit('fetchStarted')
  
  try {
    // Start the fetch process with initial progress
    emit('fetchProgress', 0, 100)
    
    const response = await axios.post('http://localhost:4000/api/inbox/fetch-emails', {})
    
    // Simulate progress updates (since we don't have real-time progress yet)
    emit('fetchProgress', 50, 100)
    
    // Small delay to ensure database operations complete
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Emit update event to refresh sidebar counts BEFORE refreshing local list
    // This ensures sidebar gets the latest data from database
    emit('emailUpdated')
    
    // Small delay to ensure sidebar refresh completes
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Refresh the email list
    emit('fetchProgress', 80, 100)
    await fetchEmails()
    
    // Complete progress
    emit('fetchProgress', 100, 100)
    
    // Small delay to show completion
    await new Promise(resolve => setTimeout(resolve, 300))
    
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Eroare la preluarea email-urilor de pe server'
  } finally {
    emit('fetchEnded')
    fetchingFromServer.value = false
  }
}

const selectEmail = async (email: any) => {
  selectedEmailId.value = email.id
  
  // Mark as read FIRST if not already, then select
  if (!email.is_read) {
    await markAsRead(email)
  }
  
  // Select the email AFTER marking as read to ensure event listeners are still active
  emit('selectEmail', email)
}

const markAsRead = async (email: any) => {
  try {
    await axios.patch(
      `http://localhost:4000/api/inbox/emails/${email.id}/read`,
      { is_read: true }
    )
    
    // Update local email object
    email.is_read = true
    
    // Emit update event to refresh sidebar counts
    emit('emailUpdated')
    
  } catch (err) {
    console.error('Error marking email as read:', err)
  }
}

const toggleReadStatus = async (email: any, updateUI = true) => {
  try {
    await axios.patch(
      `http://localhost:4000/api/inbox/emails/${email.id}/read`,
      { is_read: !email.is_read }
    )
    
    if (updateUI) {
      email.is_read = !email.is_read
    } else {
      email.is_read = true
    }
    
    // Emit update event to refresh sidebar counts
    emit('emailUpdated')
  } catch (err) {
    console.error('Error updating read status:', err)
  }
}

const showLabelModal = async (email: any) => {
  selectedEmailForLabel.value = email
  selectedLabelId.value = email.inbox_label_id || null
  
  // Fetch available labels
  try {
    const response = await axios.get('http://localhost:4000/api/inbox/labels')
    availableLabels.value = response.data.data
  } catch (err) {
    console.error('Error fetching labels:', err)
  }
  
  showingLabelModal.value = true
}

const closeLabelModal = () => {
  showingLabelModal.value = false
  selectedEmailForLabel.value = null
  selectedLabelId.value = null
}

const assignLabel = async () => {
  if (!selectedEmailForLabel.value) return
  
  try {
    await axios.patch(
      `http://localhost:4000/api/inbox/emails/${selectedEmailForLabel.value.id}/label`,
      { inbox_label_id: selectedLabelId.value }
    )
    
    // Update the email in the list
    const emailIndex = emails.value.findIndex(e => e.id === selectedEmailForLabel.value.id)
    if (emailIndex !== -1) {
      emails.value[emailIndex].inbox_label_id = selectedLabelId.value
      emails.value[emailIndex].inboxLabel = selectedLabelId.value 
        ? availableLabels.value.find(l => l.id === selectedLabelId.value)
        : null
    }
    
    // Force update sidebar counts immediately
    emit('emailUpdated')
    
    closeLabelModal()
  } catch (err) {
    console.error('Error assigning label:', err)
  }
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) {
    return date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })
  } else if (days === 1) {
    return 'Ieri'
  } else if (days < 7) {
    return `${days} zile`
  } else {
    return date.toLocaleDateString('ro-RO')
  }
}

const getEmailPreview = (htmlContent: string) => {
  // Strip HTML and return first 100 characters
  const text = htmlContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return text.length > 100 ? text.substring(0, 100) + '...' : text
}

const formatSenderName = (email: any) => {
  const name = email.email_from_name?.trim()
  const emailAddress = email.email_from?.trim()
  
  if (name && name !== emailAddress) {
    return `${name} <${emailAddress}>`
  }
  return emailAddress
}


const debouncedSearch = (() => {
  let timeout: NodeJS.Timeout
  return () => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      currentPage.value = 1
      fetchEmails()
    }, 500)
  }
})()

const clearSearch = () => {
  searchQuery.value = ''
  currentPage.value = 1
  fetchEmails()
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    fetchEmails()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    fetchEmails()
  }
}

// Trash-specific functions
const toggleEmailSelection = (emailId: number) => {
  const index = selectedEmailIds.value.indexOf(emailId)
  if (index > -1) {
    selectedEmailIds.value.splice(index, 1)
  } else {
    selectedEmailIds.value.push(emailId)
  }
}

const toggleSelectAll = () => {
  if (selectedEmailIds.value.length === emails.value.length && emails.value.length > 0) {
    // Deselect all
    selectedEmailIds.value = []
  } else {
    // Select all
    selectedEmailIds.value = emails.value.map(email => email.id)
  }
}

const restoreEmail = async (email: any) => {
  try {
    await axios.post(`http://localhost:4000/api/inbox/emails/${email.id}/restore`)
    
    // Remove from current list
    const index = emails.value.findIndex(e => e.id === email.id)
    if (index > -1) {
      emails.value.splice(index, 1)
    }
    
    // Remove from selection if selected
    const selectionIndex = selectedEmailIds.value.indexOf(email.id)
    if (selectionIndex > -1) {
      selectedEmailIds.value.splice(selectionIndex, 1)
    }
    
    emit('emailUpdated')
  } catch (error: any) {
    console.error('Error restoring email:', error)
    alert(error.response?.data?.message || 'Eroare la restaurarea email-ului')
  }
}

const showPermanentDeleteConfirm = (email: any) => {
  emailToDelete.value = email
  showDeleteDialog.value = true
}

const confirmPermanentDelete = async () => {
  if (!emailToDelete.value) return
  
  isDeleting.value = true
  try {
    await axios.delete(`http://localhost:4000/api/inbox/emails/${emailToDelete.value.id}/permanent`)
    
    // Remove from current list
    const index = emails.value.findIndex(e => e.id === emailToDelete.value.id)
    if (index > -1) {
      emails.value.splice(index, 1)
    }
    
    // Remove from selection if selected
    const selectionIndex = selectedEmailIds.value.indexOf(emailToDelete.value.id)
    if (selectionIndex > -1) {
      selectedEmailIds.value.splice(selectionIndex, 1)
    }
    
    emit('emailUpdated')
    showDeleteDialog.value = false
    emailToDelete.value = null
  } catch (error: any) {
    console.error('Error permanently deleting email:', error)
  } finally {
    isDeleting.value = false
  }
}

const closeDeleteDialog = () => {
  showDeleteDialog.value = false
  emailToDelete.value = null
}

const showBulkDeleteConfirm = () => {
  if (selectedEmailIds.value.length === 0) {
    return // Could show a toast notification here
  }
  showBulkDeleteDialog.value = true
}

const confirmBulkDelete = async () => {
  if (selectedEmailIds.value.length === 0) return
  
  isDeleting.value = true
  try {
    // Delete emails one by one
    const emailsToDelete = [...selectedEmailIds.value]
    for (const emailId of emailsToDelete) {
      await axios.delete(`http://localhost:4000/api/inbox/emails/${emailId}/permanent`)
    }
    
    // Remove all selected emails from list
    emails.value = emails.value.filter(email => !emailsToDelete.includes(email.id))
    selectedEmailIds.value = []
    
    emit('emailUpdated')
    showBulkDeleteDialog.value = false
  } catch (error: any) {
    console.error('Error bulk deleting emails:', error)
  } finally {
    isDeleting.value = false
  }
}

const closeBulkDeleteDialog = () => {
  showBulkDeleteDialog.value = false
}

// Watchers
watch(() => props.view, () => {
  currentPage.value = 1
  selectedEmailId.value = null
  selectedEmailIds.value = []  // Reset bulk selection
  fetchEmails()
}, { deep: true })

// Expose refresh method for parent components
defineExpose({
  refreshEmails: fetchEmails
})

// Lifecycle
onMounted(() => {
  fetchEmails()
})
</script>

<style scoped>
.inbox-email-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  height: 100vh;
  overflow: hidden;
}

.list-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.header-text h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a1a;
}

.header-text p {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
}

.header-actions {
  display: flex;
  gap: 0.75rem;
}

.refresh-btn,
.fetch-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.refresh-btn:hover:not(:disabled),
.fetch-btn:hover:not(:disabled) {
  border-color: #34d186;
  color: #34d186;
}

.refresh-btn:disabled,
.fetch-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-icon,
.download-icon {
  width: 16px;
  height: 16px;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.search-section {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  background: white;
}

.search-input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  width: 16px;
  height: 16px;
  color: #999;
  z-index: 1;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
}

.search-input:focus {
  outline: none;
  border-color: #34d186;
  box-shadow: 0 0 0 2px rgba(52, 209, 134, 0.1);
}

.clear-search {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.clear-search:hover {
  background: #f8f9fa;
}

.clear-icon {
  width: 16px;
  height: 16px;
  color: #999;
}

.loading-state,
.error-state,
.empty-state {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  text-align: center;
  color: #666;
}

.loading-icon,
.error-icon,
.empty-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1rem;
  color: #ccc;
}

.error-state {
  color: #dc3545;
}

.error-icon {
  color: #dc3545;
}

.retry-btn {
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background: #34d186;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.retry-btn:hover {
  background: #28a745;
}

.emails-container {
  flex: 1;
  overflow-y: auto;
}

.email-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: all 0.2s;
}

.email-item:hover {
  background: #f8f9fa;
}

.email-item.selected {
  background: #e3f2fd;
  border-left: 4px solid #34d186;
}

.email-item.unread {
  background: #fafafa;
  font-weight: 600;
}

.email-indicator {
  margin-right: 1rem;
  display: flex;
  align-items: center;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #e0e0e0;
}

.status-dot.unread {
  background: #34d186;
}

.email-content {
  flex: 1;
  min-width: 0;
}

.email-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 0.5rem;
}

.sender-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.sender-name {
  font-weight: 600;
  color: #1a1a1a;
}

.sender-email {
  font-size: 0.8rem;
  color: #666;
}

.email-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-align: right;
}

.email-date {
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
}

.email-label {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.7rem;
  color: #666;
}

.label-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.email-subject {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #1a1a1a;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.email-preview {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.email-actions {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
  opacity: 0;
  transition: opacity 0.2s;
}

.email-item:hover .email-actions {
  opacity: 1;
}

.action-btn {
  padding: 0.5rem;
  background: none;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: #f8f9fa;
  border-color: #34d186;
  color: #34d186;
}

.action-icon {
  width: 16px;
  height: 16px;
}

.pagination {
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background: #f8f9fa;
}

.page-btn {
  padding: 0.5rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-btn:hover:not(:disabled) {
  background: #34d186;
  border-color: #34d186;
  color: white;
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-icon {
  width: 16px;
  height: 16px;
}

.page-info {
  font-size: 0.9rem;
  color: #666;
}

/* Label Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1a1a1a;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 6px;
  transition: background-color 0.2s;
}

.close-btn:hover {
  background: #f8f9fa;
}

.close-icon {
  width: 20px;
  height: 20px;
  color: #666;
}

.modal-body {
  padding: 1.5rem;
  max-height: 300px;
  overflow-y: auto;
}

.label-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.label-option {
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.label-option:hover {
  background: #f8f9fa;
  border-color: #34d186;
}

.label-option.selected {
  background: #e3f2fd;
  border-color: #34d186;
  color: #34d186;
}

.option-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.remove-icon {
  width: 16px;
  height: 16px;
  color: #dc3545;
}

.label-icon {
  width: 16px;
  height: 16px;
}

.modal-footer {
  padding: 1.5rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn-cancel,
.btn-save {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel {
  background: #f8f9fa;
  border: 1px solid #e0e0e0;
  color: #666;
}

.btn-cancel:hover {
  background: #e9ecef;
}

.btn-save {
  background: #34d186;
  border: 1px solid #34d186;
  color: white;
}

.btn-save:hover {
  background: #28a745;
  border-color: #28a745;
}

@media (max-width: 768px) {
  .list-header {
    flex-direction: column;
    gap: 1rem;
    align-items: start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .fetch-btn {
    flex: 1;
    justify-content: center;
  }
  
  .email-item {
    padding: 1rem;
  }
  
  .email-header {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .email-meta {
    align-self: flex-start;
  }
  
  .email-actions {
    opacity: 1;
    margin-left: 0.5rem;
  }
}
/* Inbox type badge styles */
.inbox-type-badge {
  display: inline-flex;
  align-items: center;
  margin-right: 0.5rem;
}

.inbox-type-text {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.inbox-type-text {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
}

/* Responsive improvements */
@media (max-width: 768px) {
  .inbox-type-badge {
    margin-right: 0.3rem;
  }
  
  .inbox-type-text {
    font-size: 0.6rem;
    padding: 0.1rem 0.4rem;
  }
}

/* Trash-specific styles */
.email-checkbox {
  margin-right: 0.5rem;
  transform: scale(1.1);
  cursor: pointer;
}

.restore-btn {
  background: linear-gradient(135deg, #28a745 0%, #34d186 100%);
  color: white;
}

.restore-btn:hover {
  background: linear-gradient(135deg, #218838 0%, #2e9c71 100%);
  transform: translateY(-1px);
}

.delete-btn {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
}

.delete-btn:hover {
  background: linear-gradient(135deg, #c82333 0%, #a71e2a 100%);
  transform: translateY(-1px);
}

.select-all-btn {
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.select-all-btn:hover:not(:disabled) {
  background: #e9ecef;
  border-color: #adb5bd;
}

.select-all-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.bulk-delete-btn {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.bulk-delete-btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #c82333 0%, #a71e2a 100%);
  transform: translateY(-1px);
}

.bulk-delete-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.delete-icon {
  width: 16px;
  height: 16px;
}

/* Email items in trash view */
.emails-container .email-item .email-actions {
  min-width: 120px; /* More space for trash actions */
}

@media (max-width: 768px) {
  .select-all-btn, .bulk-delete-btn {
    font-size: 0.75rem;
    padding: 0.4rem 0.8rem;
  }
  
  .bulk-delete-btn {
    gap: 0.3rem;
  }
}
</style>