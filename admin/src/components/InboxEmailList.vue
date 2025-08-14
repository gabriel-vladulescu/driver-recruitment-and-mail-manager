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
          <Archive v-else-if="view.type === 'archive'" />
          <Inbox v-else />
        </div>
        <div class="header-text">
          <h2>{{ getViewTitle() }}</h2>
          <p v-if="currentPagination?.total > 0">
            {{ currentPagination.total }} email{{ currentPagination.total !== 1 ? '-uri' : '' }}
            <span v-if="currentPagination?.unread > 0" class="unread-text">
              ({{ currentPagination.unread }} necitit{{ currentPagination.unread !== 1 ? 'e' : '' }})
            </span>
          </p>
        </div>
      </div>
      
      <div class="header-actions">
        <template v-if="view.type !== 'trash'">
          <!-- Normal actions -->
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

    <!-- Search and Actions Section -->
    <div class="search-actions-section">
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
      
      <!-- Gmail-style Bulk Actions Toolbar -->
      <div class="bulk-actions-toolbar">
        <!-- No Selection State -->
        <div v-if="!hasSelectionOnCurrentPage" class="toolbar-no-selection">
          <div class="bulk-select-dropdown">
            <input 
              type="checkbox" 
              class="bulk-checkbox"
              :checked="allCurrentPageSelected"
              @click="toggleCurrentPageSelection"
            />
            <button @click="showBulkSelectMenu = !showBulkSelectMenu" class="dropdown-btn">
              <ChevronDown class="dropdown-icon" />
            </button>
            <div v-if="showBulkSelectMenu" class="dropdown-menu">
              <button @click="selectAll('page')" class="dropdown-item">
                <span>Toate</span>
              </button>
              <button @click="selectAll('unread')" class="dropdown-item">
                <span>Necitite</span>
              </button>
              <button @click="selectAll('read')" class="dropdown-item">
                <span>Citite</span>
              </button>
            </div>
          </div>
          
          <button @click="fetchEmails" class="toolbar-btn" :disabled="loading">
            <RefreshCw class="toolbar-icon" :class="{ spinning: loading }" />
          </button>
          
          <div class="more-actions-dropdown">
            <button @click="showMoreActionsMenu = !showMoreActionsMenu" class="toolbar-btn">
              <MoreVertical class="toolbar-icon" />
            </button>
            <div v-if="showMoreActionsMenu" class="dropdown-menu">
              <button @click="markAllAsRead" class="dropdown-item">
                <MailOpen class="dropdown-item-icon" />
                <span>Marchează toate ca citite</span>
              </button>
            </div>
          </div>
        </div>
        
        <!-- Has Selection State -->
        <div v-else class="toolbar-has-selection">
          <div class="selected-info">
            <div class="bulk-select-dropdown">
              <input 
                type="checkbox" 
                class="bulk-checkbox"
                :checked="allCurrentPageSelected"
                @click="toggleCurrentPageSelection"
              />
              <button @click="showBulkDeselectMenu = !showBulkDeselectMenu" class="dropdown-btn">
                <ChevronDown class="dropdown-icon" />
              </button>
              <div v-if="showBulkDeselectMenu" class="dropdown-menu">
                <button @click="deselectAll('page')" class="dropdown-item">
                  <span>Toate</span>
                </button>
                <button @click="deselectAll('unread')" class="dropdown-item">
                  <span>Necitite</span>
                </button>
                <button @click="deselectAll('read')" class="dropdown-item">
                  <span>Citite</span>
                </button>
              </div>
            </div>
            <span class="selected-count">
              {{ selectedEmailsOnCurrentPage.length }} selectat{{ selectedEmailsOnCurrentPage.length > 1 ? 'e' : '' }}
              <span v-if="selectedEmailIds.length > selectedEmailsOnCurrentPage.length" class="total-selected">
                ({{ selectedEmailIds.length }} total)
              </span>
            </span>
          </div>
          
          <div class="selection-actions" v-if="view.type === 'trash'">
            <button @click="selectedEmailsOnCurrentPage.length > 0 && (showCleanTrashDialog = true)" class="toolbar-btn" title="Șterge definitiv">
              <Trash2 class="toolbar-icon" />
            </button>

            <button @click="selectedEmailsOnCurrentPage.length > 0 && (showRestoreDialog = true)" class="toolbar-btn" title="Restaurează email-uri">
              <MailCheck class="toolbar-icon" />
            </button>
            
            <div class="more-actions-dropdown">
              <button @click="showSelectionMoreActions = !showSelectionMoreActions" class="toolbar-btn">
                <MoreVertical class="toolbar-icon" />
              </button>
              <div v-if="showSelectionMoreActions" class="dropdown-menu">
                <button @click="deselectAll('all')" class="dropdown-item">
                  <X class="dropdown-item-icon" />
                  <span>Deselectează toate (din toate paginile)</span>
                </button>
              </div>
            </div>
          </div>

          <div class="selection-actions" v-else-if="view.type === 'archive'">
            <button @click="emailService.moveToTrash(selectedEmailsOnCurrentPage, true)" class="toolbar-btn" title="Mută în coș">
              <Trash2 class="toolbar-icon" />
            </button>

            <button @click="selectedEmailsOnCurrentPage.length > 0 && (showRestoreFromArchiveDialog = true)" class="toolbar-btn" title="Restaurează din arhivă">
              <MailCheck class="toolbar-icon" />
            </button>
            
            <div class="more-actions-dropdown">
              <button @click="showSelectionMoreActions = !showSelectionMoreActions" class="toolbar-btn">
                <MoreVertical class="toolbar-icon" />
              </button>
              <div v-if="showSelectionMoreActions" class="dropdown-menu">
                <button @click="deselectAll('all')" class="dropdown-item">
                  <X class="dropdown-item-icon" />
                  <span>Deselectează toate (din toate paginile)</span>
                </button>
              </div>
            </div>
          </div>

          <div class="selection-actions" v-else-if="view.type !== 'trash' && view.type !== 'archive'">
            <button @click="emailService.moveToTrash(selectedEmailsOnCurrentPage)" class="toolbar-btn" title="Mută în coș">
              <Trash2 class="toolbar-icon" />
            </button>

            <button 
              @click="bulkMarkAsReadCurrentPage" 
              class="toolbar-btn" 
              :title="shouldMarkAsRead ? 'Marchează ca citite' : 'Marchează ca necitite'"
            >
              <MailOpen v-if="shouldMarkAsRead" class="toolbar-icon" />
              <Mail v-else class="toolbar-icon" />
            </button>
            
            <button @click="showingLabelModal = true" class="toolbar-btn" title="Schimbă eticheta">
              <FolderOpen class="toolbar-icon" />
            </button>
            
            <button @click="emailService.moveToArchive(selectedEmailsOnCurrentPage)" class="toolbar-btn" title="Arhivează">
              <Archive class="toolbar-icon" />
            </button>
            
            <div class="more-actions-dropdown">
              <button @click="showSelectionMoreActions = !showSelectionMoreActions" class="toolbar-btn">
                <MoreVertical class="toolbar-icon" />
              </button>
              <div v-if="showSelectionMoreActions" class="dropdown-menu">
                <button @click="deselectAll('all')" class="dropdown-item">
                  <X class="dropdown-item-icon" />
                  <span>Deselectează toate (din toate paginile)</span>
                </button>
              </div>
            </div>
          </div>

        </div>
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
    <div class="emails-container">
      <div 
        v-for="email in emails" 
        :key="email.id"
        class="email-item"
        :class="{ 'unread': !email.is_read, 'selected': selectedEmailIds.includes(email.id) }"
        @click="selectEmail(email)"
      >
        <div class="email-checkbox-container">
          <input 
            type="checkbox" 
            :checked="selectedEmailIds.includes(email.id)"
            @click.stop
            @change="toggleEmailSelection(email.id)"
            class="email-checkbox"
          />
        </div>
        
        <div class="email-indicator">
          <div class="status-dot" :class="{ 'unread': !email.is_read }"></div>
        </div>
        
        <div class="email-main-content">
          <div class="email-sender">
            <div class="inbox-type-badge" v-if="email.inboxType">
              <span class="inbox-type-text">{{ email.inboxType.name }}</span>
            </div>
            <span class="sender-name">{{ email.email_from_name }}</span>
          </div>
          
          <div class="email-subject-preview">
            <span class="email-subject">{{ email.subject || 'Fără subiect' }}</span>
            <span class="email-separator"> - </span>
            <span class="email-preview">{{ emailHelper.getEmailPreview(email.message) }}</span>
          </div>
        </div>
        
        <div class="email-date-column">
          <span class="email-date">{{ dateHelper.formatDate(email.createdAt) }}</span>
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
    <LabelSelectorModal
      :is-visible="showingLabelModal"
      :emailIds="selectedEmailsOnCurrentPage"
      @cancel="showingLabelModal = false"
    />

    <!-- Delete Confirmation Dialogs -->
    <ConfirmDialog
      :is-visible="showCleanTrashDialog"
      type="danger"
      title="Șterge Definitiv Email-uri"
      :message="`Sigur dorești să ștergi definitiv ${selectedEmailsOnCurrentPage.length} email${selectedEmailsOnCurrentPage.length > 1 ? '-uri' : ''} selectate? Această acțiune nu poate fi anulată.`"
      confirm-text="Șterge Definitiv"
      cancel-text="Anulează"
      @confirm="emailService.cleanTrash(selectedEmailsOnCurrentPage)"
      @cancel="showCleanTrashDialog = false"
    />

    <ConfirmDialog
      :is-visible="showRestoreDialog"
      type="info"
      title="Restaurează Email-uri"
      :message="`Sigur dorești să restaurezi ${selectedEmailsOnCurrentPage.length} email${selectedEmailsOnCurrentPage.length > 1 ? '-uri' : ''} selectate din coșul de gunoi?`"
      confirm-text="Restaurează"
      cancel-text="Anulează"
      @confirm="emailService.restoreFromTrash(selectedEmailsOnCurrentPage)"
      @cancel="showRestoreDialog = false"
    />

    <ConfirmDialog
      :is-visible="showRestoreFromArchiveDialog"
      type="info"
      title="Restaurează din Arhivă"
      :message="`Sigur dorești să restaurezi ${selectedEmailsOnCurrentPage.length} email${selectedEmailsOnCurrentPage.length > 1 ? '-uri' : ''} selectate din arhivă?`"
      confirm-text="Restaurează"
      cancel-text="Anulează"
      @confirm="emailService.restoreFromArchive(selectedEmailsOnCurrentPage)"
      @cancel="showRestoreFromArchiveDialog = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { emailService, labelService } from '@/api'
import { useEmailStore } from '@/stores/emailStore'
import '@/assets/modal.css'
import '@/assets/inbox-email-list.css'
import {
  Mail, Send, Tag, Inbox, RefreshCw, Download, Search, X, Loader, AlertCircle,
  MailOpen, ChevronLeft, ChevronRight, Trash2, ChevronDown, MoreVertical, FolderOpen, Archive, MailCheck
} from 'lucide-vue-next'
import ConfirmDialog from './modals/ConfirmDialog.vue'
import LabelSelectorModal from './modals/LabelSelectorModal.vue'
import { dateHelper, emailHelper } from '@helpers'
import { serverService } from '@/api/serverService'

// Props
interface Props {
  view: {
    type: 'category' | 'label' | 'all' | 'trash'
    id?: string | number
    data?: any
  }
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  selectEmail: [email: any]
  emailUpdated: []
  paginationUpdated: [pagination: any, view: any]
  fetchStarted: []
  fetchProgress: [processed: number, total: number]
  fetchEnded: []
}>()

// State
const emailStore = useEmailStore()
const emails = ref<any[]>([])
const loading = ref(false)
const error = ref('')
const searchQuery = ref('')
const currentPage = ref(1)
const totalPages = ref(1)
const currentPagination = ref<any>(null)  // Store pagination data
const selectedEmailIds = ref<number[]>([])  // For bulk selection in trash
const showCleanTrashDialog = ref(false)
const showRestoreDialog = ref(false)
const showRestoreFromArchiveDialog = ref(false)
const selectedEmailId = ref<number | null>(null)
const fetchingFromServer = ref(false)

// Label modal state
const showingLabelModal = ref(false)

// Bulk selection dropdown states
const showBulkSelectMenu = ref(false)
const showBulkDeselectMenu = ref(false)
const showMoreActionsMenu = ref(false)
const showSelectionMoreActions = ref(false)

// Computed properties for current page selection state
const currentPageEmailIds = computed(() => emails.value.map(email => email.id))
const selectedEmailsOnCurrentPage = computed(() => 
  selectedEmailIds.value.filter(id => currentPageEmailIds.value.includes(id))
)
const hasSelectionOnCurrentPage = computed(() => selectedEmailsOnCurrentPage.value.length > 0)
const allCurrentPageSelected = computed(() => 
  currentPageEmailIds.value.length > 0 && 
  currentPageEmailIds.value.every(id => selectedEmailIds.value.includes(id))
)

// Smart read/unread logic
const selectedEmailsReadStatus = computed(() => {
  const selectedEmails = emails.value.filter(email => selectedEmailsOnCurrentPage.value.includes(email.id))
  const readEmails = selectedEmails.filter(email => email.is_read)
  const unreadEmails = selectedEmails.filter(email => !email.is_read)
  
  return {
    total: selectedEmails.length,
    read: readEmails.length,
    unread: unreadEmails.length,
    allRead: selectedEmails.length > 0 && readEmails.length === selectedEmails.length,
    allUnread: selectedEmails.length > 0 && unreadEmails.length === selectedEmails.length,
    mixed: selectedEmails.length > 0 && readEmails.length > 0 && unreadEmails.length > 0
  }
})

const shouldMarkAsRead = computed(() => {
  // If all selected are read, we'll mark as unread
  // If all selected are unread or mixed, we'll mark as read
  return !selectedEmailsReadStatus.value.allRead
})

// Computed
const getViewTitle = () => {
  if (props.view.type === 'category') {
    return props.view.data?.name || 'Categorie'
  } else if (props.view.type === 'label') {
    return props.view.data?.label || 'Etichetă'
  } else if (props.view.type === 'trash') {
    return 'Coș de gunoi'
  } else if (props.view.type === 'archive') {
    return 'Arhivă'
  }
  return 'Email-uri'
}

// Methods
const fetchEmails = async () => {
  if (loading.value) return
  
  loading.value = true
  error.value = ''
  
  try {
    const data = await emailService.getEmails({
      view: props.view,
      page: currentPage.value,
      search: searchQuery.value
    })
    
    emails.value = data.emails
    totalPages.value = data.pagination.totalPages
    currentPagination.value = data.pagination
    
    // Emit pagination data to update sidebar badges with current view data
    emit('paginationUpdated', data.pagination, props.view)
    
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
    
    await serverService.fetchEmailsFromServer()
    
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

  if (!email.is_read) {
    await emailService.markAsRead(email.id, true);
  }
  
  emit('selectEmail', email)
}

const debouncedSearch = (() => {
  let timeout: ReturnType<typeof setTimeout>
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

// Bulk Actions Methods
const toggleEmailSelection = (emailId: number) => {
  const index = selectedEmailIds.value.indexOf(emailId)
  if (index > -1) {
    selectedEmailIds.value.splice(index, 1)
  } else {
    selectedEmailIds.value.push(emailId)
  }
}

// New bulk selection methods
const selectAll = (type: 'page' | 'unread' | 'read') => {
  let emailsToSelect: any[] = []
  
  if (type === 'page') {
    emailsToSelect = emails.value
  } else if (type === 'unread') {
    emailsToSelect = emails.value.filter(email => !email.is_read)
  } else if (type === 'read') {
    emailsToSelect = emails.value.filter(email => email.is_read)
  }
  
  // Add new selections while preserving existing ones from other pages
  const newSelectedIds = emailsToSelect.map(email => email.id)
  const currentPageIds = emails.value.map(email => email.id)
  
  // Remove current page emails from existing selection, then add new selections
  selectedEmailIds.value = [
    ...selectedEmailIds.value.filter(id => !currentPageIds.includes(id)),
    ...newSelectedIds
  ]
  
  showBulkSelectMenu.value = false
}

const deselectAll = (type: 'page' | 'unread' | 'read' | 'all') => {
  if (type === 'all') {
    selectedEmailIds.value = []
  } else if (type === 'page') {
    // Pentru "page" când avem selecție, deselectează toate de pe pagină
    const pageEmailIds = emails.value.map(email => email.id)
    selectedEmailIds.value = selectedEmailIds.value.filter(id => !pageEmailIds.includes(id))
  } else if (type === 'unread') {
    // Deselectează doar email-urile necitite de pe pagina curentă
    const unreadEmailIds = emails.value.filter(email => !email.is_read).map(email => email.id)
    selectedEmailIds.value = selectedEmailIds.value.filter(id => !unreadEmailIds.includes(id))
  } else if (type === 'read') {
    // Deselectează doar email-urile citite de pe pagina curentă
    const readEmailIds = emails.value.filter(email => email.is_read).map(email => email.id)
    selectedEmailIds.value = selectedEmailIds.value.filter(id => !readEmailIds.includes(id))
  }
  
  showBulkDeselectMenu.value = false
  showSelectionMoreActions.value = false
}

const markAllAsRead = async () => {
  try {
    const unreadEmails = emails.value.filter(email => !email.is_read)
    const unreadEmailIds = unreadEmails.map(email => email.id)
    
    if (unreadEmailIds.length > 0) {
      await emailService.markAsRead(unreadEmailIds, true)
      
      // Update local emails
      unreadEmails.forEach(email => {
        email.is_read = true
      })
    }
    
    emit('emailUpdated')
    showMoreActionsMenu.value = false
  } catch (error) {
    console.error('Error marking all as read:', error)
  }
}

// New functions for current page actions
const toggleCurrentPageSelection = () => {
  if (allCurrentPageSelected.value) {
    // Deselect all emails on current page while preserving others
    const pageEmailIds = emails.value.map(email => email.id)
    selectedEmailIds.value = selectedEmailIds.value.filter(id => !pageEmailIds.includes(id))
  } else {
    // Select all emails on current page while preserving others
    const pageEmailIds = emails.value.map(email => email.id)
    const emailsNotAlreadySelected = pageEmailIds.filter(id => !selectedEmailIds.value.includes(id))
    selectedEmailIds.value = [...selectedEmailIds.value, ...emailsNotAlreadySelected]
  }
}

const bulkMarkAsReadCurrentPage = async () => {
  const emailsToUpdate = selectedEmailsOnCurrentPage.value
  const targetReadState = shouldMarkAsRead.value
  
  try {
    // Use the smart bulk markAsRead function
    await emailService.markAsRead(emailsToUpdate, targetReadState)
    
    // Update local emails
    emails.value.forEach(email => {
      if (emailsToUpdate.includes(email.id)) {
        email.is_read = targetReadState
      }
    })
    
    emit('emailUpdated')
  } catch (error) {
    console.error('Error bulk updating read status:', error)
  }
}

// Watchers
watch(() => props.view, () => {
  currentPage.value = 1
  selectedEmailId.value = null
  selectedEmailIds.value = []  // Reset bulk selection
  fetchEmails()
}, { deep: true })

// Watch for email updates from store to reload list
watch(() => emailStore.updateTrigger, () => {
  fetchEmails(); // Reload email list when triggered from services
})

// Expose refresh method for parent components
defineExpose({
  refreshEmails: fetchEmails
})

// Click outside handler to close dropdowns
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  
  // Check if click is outside any dropdown
  if (!target.closest('.bulk-select-dropdown') && !target.closest('.more-actions-dropdown')) {
    showBulkSelectMenu.value = false
    showBulkDeselectMenu.value = false
    showMoreActionsMenu.value = false
    showSelectionMoreActions.value = false
  }
}

// Lifecycle
onMounted(() => {
  fetchEmails()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>