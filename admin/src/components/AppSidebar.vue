<template>
  <div class="sidebar">
    <!-- Header -->
    <div class="sidebar-header">
      <div class="logo">
        <div class="logo-icon">
          <Shield class="icon" />
        </div>
        <div class="logo-text">
          <h2>Bloom Admin</h2>
        </div>
      </div>
      <div class="user-menu">
        <button @click="showUserMenu = !showUserMenu" class="user-btn">
          <User class="user-icon" />
          <ChevronDown class="dropdown-icon" />
        </button>
        <div v-if="showUserMenu" class="user-dropdown">
          <div class="user-info">
            <span class="user-email">{{ authStore.user?.email }}</span>
          </div>
          <button @click="openSettings" class="dropdown-menu-btn">
            <Settings class="menu-icon" />
            Setări
          </button>
          <button @click="handleLogout" class="logout-btn">
            <LogOut class="logout-icon" />
            Deconectare
          </button>
        </div>
      </div>
    </div>


    <!-- Inbox Categories -->
    <div class="messages-container">
      <!-- Direct Categories -->
      <div v-for="category in inboxCategories" :key="category.id" class="messages-section">
        <div 
          class="category-item" 
          :class="{ 'active': selectedView.type === 'category' && selectedView.id === category.id }"
          @click="selectCategoryView(category)"
        >
          <div class="category-content-main">
            <div class="category-info">
              <Mail v-if="category.category === 'EMAILS_RECEIVED'" class="category-icon" />
              <Send v-else-if="category.category === 'EMAILS_SENT'" class="category-icon" />
              <Inbox v-else class="category-icon" />
              <span class="category-title">{{ category.name }}</span>
            </div>
            <div class="category-badges">
              <span v-if="getCategoryUnreadCount(category.id) > 0" class="unread-badge">
                {{ getCategoryUnreadCount(category.id) }}
              </span>
              <span v-if="getCategoryCount(category.id) > 0" class="count-badge">
                {{ getCategoryCount(category.id) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Toate Mesajele Category -->
      <div class="messages-section">
        <div 
          class="category-item" 
          :class="{ 'active': selectedView.type === 'all' }"
          @click="selectAllView()"
        >
          <div class="category-content-main">
            <div class="category-info">
              <Inbox class="category-icon" />
              <span class="category-title">Toate Mesajele</span>
            </div>
            <div class="category-badges">
              <span v-if="getTotalEmailsCount() > 0" class="count-badge">
                {{ getTotalEmailsCount() }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Labels Section -->
      <div class="messages-section">
        <div class="section-header" @click="toggleSection('labels')">
          <div class="section-title">
            <Tag class="section-icon" />
            Etichete
            <button @click.stop="showLabelModal = true" class="add-label-btn">
              <Plus class="plus-icon" />
            </button>
          </div>
          <ChevronDown 
            class="toggle-icon" 
            :class="{ 'rotated': !sectionsCollapsed.labels }"
          />
        </div>
        
        <div v-if="!sectionsCollapsed.labels" class="category-content">
          <div v-if="inboxLabels.length === 0" class="empty-labels">
            <Tag class="empty-icon" />
            <span>Nu există etichete</span>
          </div>
          
          <div 
            v-else
            v-for="label in inboxLabels" 
            :key="label.id"
            class="label-item"
            :class="{ 'active': selectedView.type === 'label' && selectedView.id === label.id }"
            @click="selectLabelView(label)"
          >
            <div class="label-indicator" :style="{ backgroundColor: label.color }"></div>
            <component :is="label.icon" class="label-icon" />
            <span>{{ label.label }}</span>
            <span v-if="getLabelCount(label.id) > 0" class="count-badge">
              {{ getLabelCount(label.id) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Legacy Forms Section (for backward compatibility) -->
      <div class="messages-section">
        <div class="section-header" @click="toggleSection('forms')">
          <div class="section-title">
            <MessageSquare class="section-icon" />
            Formulare Contact
            <span v-if="unreadCount > 0" class="unread-badge">{{ unreadCount }}</span>
          </div>
          <ChevronDown 
            class="toggle-icon" 
            :class="{ 'rotated': !sectionsCollapsed.forms }"
          />
        </div>
        
        <div v-if="!sectionsCollapsed.forms" class="messages-list">
          <div v-if="messagesStore.loading" class="loading-state">
            <Loader class="loading-icon spinning" />
            <span>Se încarcă mesajele...</span>
          </div>
          
          <div v-else-if="messagesStore.error" class="error-state">
            <AlertCircle class="error-icon" />
            <span>{{ messagesStore.error }}</span>
          </div>
          
          <div v-else-if="activeMessages.length === 0" class="empty-messages">
            <MessageSquare class="empty-icon" />
            <span>Nu există formulare</span>
          </div>
          
          <MessageItem
            v-else
            v-for="message in activeMessages"
            :key="message.id"
            :message="message"
            :is-selected="selectedMessage?.id === message.id"
            @click="selectMessage(message)"
          />
        </div>
      </div>
    </div>

    <!-- Label Management Modal -->
    <div v-if="showLabelModal" class="modal-overlay" @click="closeLabelModal">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h3>{{ editingLabel ? 'Editează Eticheta' : 'Adaugă Eticheta Nouă' }}</h3>
          <button @click="closeLabelModal" class="close-btn">
            <X class="close-icon" />
          </button>
        </div>
        
        <div class="modal-body">
          <div class="form-group">
            <label>Nume etichetă</label>
            <input 
              v-model="labelForm.label" 
              type="text" 
              placeholder="Introdu numele etichetei"
              class="form-input"
            />
          </div>
          
          <div class="form-group">
            <label>Culoare</label>
            <div class="color-picker">
              <input 
                v-model="labelForm.color" 
                type="color" 
                class="color-input"
              />
              <input 
                v-model="labelForm.color" 
                type="text" 
                placeholder="#000000"
                class="color-text"
              />
            </div>
          </div>
          
          <div class="form-group">
            <label>Iconiță</label>
            <select v-model="labelForm.icon" class="form-select">
              <option value="Tag">Tag</option>
              <option value="Briefcase">Briefcase</option>
              <option value="Bookmark">Bookmark</option>
              <option value="Star">Star</option>
              <option value="Heart">Heart</option>
              <option value="Archive">Archive</option>
              <option value="Flag">Flag</option>
            </select>
          </div>
        </div>
        
        <div class="modal-footer">
          <button @click="closeLabelModal" class="btn-cancel">Anulează</button>
          <button @click="saveLabel" class="btn-save" :disabled="!labelForm.label">
            {{ editingLabel ? 'Actualizează' : 'Creează' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Settings Modal -->
    <SettingsModal
      :is-visible="showSettings"
      @close="closeSettings"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMessagesStore, type Message, type SentMessage } from '@/stores/messages'
import axios from 'axios'
import {
  Shield,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Mail,
  MessageSquare,
  Inbox,
  Archive,
  MessageCircle,
  Loader,
  AlertCircle,
  Send,
  Tag,
  Plus,
  X,
  Briefcase,
  Bookmark,
  Star,
  Heart,
  Flag
} from 'lucide-vue-next'
import MessageItem from './MessageItem.vue'
import SentMessageItem from './SentMessageItem.vue'
import SettingsModal from './SettingsModal.vue'

// Types
interface InboxCategory {
  id: number
  category: string
  name: string
}

interface InboxLabel {
  id: number
  label: string
  color: string
  icon: string
}

interface InboxEmail {
  id: number
  inbox_category_id: number
  inbox_label_id?: number
  subject: string
  email_from: string
  is_read: boolean
  createdAt: string
}

interface SelectedView {
  type: 'category' | 'label' | 'all'
  id?: number
  data?: InboxCategory | InboxLabel
}

const emit = defineEmits<{
  selectMessage: [messageId: string]
  selectInboxView: [view: SelectedView]
  refreshNeeded: []
}>()

const router = useRouter()
const authStore = useAuthStore()
const messagesStore = useMessagesStore()

// State
const showUserMenu = ref(false)
const showSettings = ref(false)
const showLabelModal = ref(false)
const editingLabel = ref<InboxLabel | null>(null)
const sectionsCollapsed = ref<Record<string, boolean>>({
  forms: true,
  labels: false
})

// Inbox data
const inboxCategories = ref<InboxCategory[]>([])
const inboxLabels = ref<InboxLabel[]>([])
const inboxEmails = ref<InboxEmail[]>([])
const selectedView = ref<SelectedView>({ type: 'all' })

// Label form
const labelForm = ref({
  label: '',
  color: '#34d186',
  icon: 'Tag'
})

// Legacy data (for backward compatibility)
const activeMessages = computed(() => messagesStore.activeMessages)
const archivedMessages = computed(() => messagesStore.archivedMessages)
const sentMessages = computed(() => messagesStore.sentMessages)
const selectedMessage = computed(() => messagesStore.selectedMessage)
const selectedSentMessage = computed(() => messagesStore.selectedSentMessage)

const unreadCount = computed(() => messagesStore.unreadMessages.length)
const activeCount = computed(() => activeMessages.value.length)
const archivedCount = computed(() => archivedMessages.value.length)
const sentCount = computed(() => messagesStore.sentMessagesCount)

// Computed for inbox counts
const getCategoryCount = (categoryId: number) => {
  return inboxEmails.value.filter(email => email.inbox_category_id === categoryId).length
}

const getCategoryUnreadCount = (categoryId: number) => {
  return inboxEmails.value.filter(email => 
    email.inbox_category_id === categoryId && !email.is_read
  ).length
}

const getLabelCount = (labelId: number) => {
  return inboxEmails.value.filter(email => email.inbox_label_id === labelId).length
}

const getTotalEmailsCount = () => {
  return inboxEmails.value.length
}

// Functions
function toggleSection(section: string) {
  sectionsCollapsed.value[section] = !sectionsCollapsed.value[section]
}

function selectCategoryView(category: InboxCategory) {
  const view: SelectedView = { type: 'category', id: category.id, data: category }
  selectedView.value = view
  emit('selectInboxView', view)
}

function selectAllView() {
  const view: SelectedView = { type: 'all' }
  selectedView.value = view
  emit('selectInboxView', view)
}

function selectLabelView(label: InboxLabel) {
  const view: SelectedView = { type: 'label', id: label.id, data: label }
  selectedView.value = view
  emit('selectInboxView', view)
}

function selectMessage(message: Message) {
  messagesStore.selectMessage(message)
  emit('selectMessage', message.id)
}

function selectSentMessage(sentMessage: SentMessage) {
  messagesStore.selectSentMessage(sentMessage)
}

function openSettings() {
  showUserMenu.value = false
  showSettings.value = true
}

function closeSettings() {
  showSettings.value = false
}

function closeLabelModal() {
  showLabelModal.value = false
  editingLabel.value = null
  labelForm.value = {
    label: '',
    color: '#34d186',
    icon: 'Tag'
  }
}

async function saveLabel() {
  try {
    const url = editingLabel.value 
      ? `/api/inbox/labels/${editingLabel.value.id}` 
      : '/api/inbox/labels'
    
    const method = editingLabel.value ? 'patch' : 'post'
    
    await axios[method](`http://localhost:4000${url}`, labelForm.value)
    
    await fetchInboxLabels()
    closeLabelModal()
  } catch (error) {
    console.error('Error saving label:', error)
  }
}

async function fetchInboxCategories() {
  try {
    const response = await axios.get('http://localhost:4000/api/inbox/categories')
    inboxCategories.value = response.data.data
    
    // Set default collapsed state for categories
    response.data.data.forEach((category: InboxCategory) => {
      if (sectionsCollapsed.value[`category-${category.id}`] === undefined) {
        sectionsCollapsed.value[`category-${category.id}`] = true
      }
    })
  } catch (error) {
    console.error('Error fetching inbox categories:', error)
  }
}

async function fetchInboxLabels() {
  try {
    const response = await axios.get('http://localhost:4000/api/inbox/labels')
    inboxLabels.value = response.data.data
  } catch (error) {
    console.error('Error fetching inbox labels:', error)
  }
}

async function fetchInboxEmails() {
  try {
    const response = await axios.get('http://localhost:4000/api/inbox/emails?limit=1000')
    inboxEmails.value = response.data.data.emails
  } catch (error) {
    console.error('Error fetching inbox emails:', error)
  }
}

async function handleLogout() {
  authStore.logout()
  router.push('/login')
}

// Expose refresh method for parent components
defineExpose({
  refreshInboxData: async () => {
    await fetchInboxEmails()
  }
})

onMounted(async () => {
  // Load inbox data
  await Promise.all([
    fetchInboxCategories(),
    fetchInboxLabels(),
    fetchInboxEmails()
  ])
  
  // Load legacy sent messages
  messagesStore.fetchSentMessages()
  
  // Close user menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target?.closest('.user-menu')) {
      showUserMenu.value = false
    }
  })
})
</script>

<style scoped>
.sidebar {
  width: 400px;
  min-width: 400px;
  background: white;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon .icon {
  width: 20px;
  height: 20px;
  color: white;
}

.logo-text h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
}

.user-menu {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
}

.user-btn:hover {
  border-color: #34d186;
  box-shadow: 0 0 0 2px rgba(52, 209, 134, 0.1);
}

.user-icon,
.dropdown-icon {
  width: 18px;
  height: 18px;
  color: #666;
}

.user-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  min-width: 200px;
  margin-top: 0.5rem;
}

.user-info {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.user-email {
  font-size: 0.9rem;
  color: #666;
}

.dropdown-menu-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #666;
  border-bottom: 1px solid #e0e0e0;
}

.dropdown-menu-btn:hover {
  background: #f8f9fa;
  color: #34d186;
}

.menu-icon {
  width: 16px;
  height: 16px;
}

.logout-btn {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.2s;
  color: #dc3545;
}

.logout-btn:hover {
  background: #f8f9fa;
}

.logout-icon {
  width: 16px;
  height: 16px;
}

.stats-section {
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  gap: 1rem;
}

.stat-card {
  flex: 1;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid #e0e0e0;
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon.unread {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
}

.stat-icon.total {
  background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
}

.stat-icon.sent {
  background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
}

.stat-icon .icon {
  width: 20px;
  height: 20px;
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1;
}

.stat-label {
  font-size: 0.8rem;
  color: #666;
  margin-top: 0.25rem;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
}

.messages-section {
  border-bottom: 1px solid #e0e0e0;
}

.section-header {
  padding: 1rem 1.5rem;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
}

.section-header:hover {
  background: #e9ecef;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.section-icon {
  width: 18px;
  height: 18px;
  color: #34d186;
}

.unread-badge,
.archived-badge {
  background: #34d186;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.archived-badge {
  background: #6c757d;
}

.sent-badge {
  background: #007bff;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.toggle-icon {
  width: 18px;
  height: 18px;
  color: #666;
  transition: transform 0.3s;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.messages-list {
  max-height: 600px;
  overflow-y: auto;
}

.loading-state,
.error-state,
.empty-messages {
  padding: 2rem 1.5rem;
  text-align: center;
  color: #666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.loading-icon,
.error-icon,
.empty-icon {
  width: 24px;
  height: 24px;
  color: #ccc;
}

.spinning {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.error-state {
  color: #dc3545;
}

.error-icon {
  color: #dc3545;
}

/* New styles for inbox system */
.category-content {
  background: #fafafa;
}

.category-item {
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;
  background: white;
}

.category-item:hover {
  background: #f0f8ff;
  color: #34d186;
}

.category-item.active {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  font-weight: 600;
  border-left: 4px solid #28a745;
}

.category-content-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.category-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.category-title {
  font-weight: 600;
  font-size: 0.95rem;
}

.category-badges {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.label-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 2rem;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 1px solid #f0f0f0;
}

.label-item:hover {
  background: #f0f8ff;
  color: #34d186;
}

.label-item.active {
  background: linear-gradient(135deg, #34d186 0%, #28a745 100%);
  color: white;
  font-weight: 600;
}

.label-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.label-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.count-badge {
  background: #e9ecef;
  color: #666;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 10px;
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.category-item.active .count-badge,
.label-item.active .count-badge {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.add-label-btn {
  margin-left: auto;
  background: #34d186;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.add-label-btn:hover {
  background: #28a745;
  transform: scale(1.1);
}

.plus-icon {
  width: 12px;
  height: 12px;
  color: white;
}

.empty-labels {
  padding: 1.5rem 2rem;
  text-align: center;
  color: #999;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

/* Modal styles */
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
  max-width: 500px;
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
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #1a1a1a;
}

.form-input,
.form-select,
.color-text {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-select:focus,
.color-text:focus {
  outline: none;
  border-color: #34d186;
  box-shadow: 0 0 0 2px rgba(52, 209, 134, 0.1);
}

.color-picker {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.color-input {
  width: 60px;
  height: 45px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
}

.color-text {
  flex: 1;
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

.btn-save:hover:not(:disabled) {
  background: #28a745;
  border-color: #28a745;
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .sidebar {
    width: 100%;
    max-width: none;
    height: auto;
    min-height: auto;
  }
  
  .stats-section {
    flex-direction: column;
    gap: 0.75rem;
  }
  
  .stat-card {
    flex: none;
  }
  
  .messages-list {
    max-height: none;
    height: auto;
  }
  
  .modal-content {
    width: 95%;
    margin: 1rem;
  }
  
  .color-picker {
    flex-direction: column;
    align-items: stretch;
  }
  
  .color-input {
    width: 100%;
  }
}
</style>