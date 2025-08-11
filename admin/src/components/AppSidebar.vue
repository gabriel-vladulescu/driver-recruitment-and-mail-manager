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


    <!-- Messages Sections -->
    <div class="messages-container">
      <!-- All Messages -->
      <div class="messages-section">
        <div class="section-header" @click="toggleSection('all')">
          <div class="section-title">
            <Inbox class="section-icon" />
            Toate Mesajele
            <span v-if="unreadCount > 0" class="unread-badge green">{{ unreadCount }}</span>
          </div>
          <ChevronDown 
            class="toggle-icon" 
            :class="{ 'rotated': !sectionsCollapsed.all }"
          />
        </div>
        
        <div v-if="!sectionsCollapsed.all" class="messages-list">
          <div v-if="messagesStore.loading" class="loading-state">
            <Loader class="loading-icon spinning" />
            <span>Se încarcă mesajele...</span>
          </div>
          
          <div v-else-if="messagesStore.error" class="error-state">
            <AlertCircle class="error-icon" />
            <span>{{ messagesStore.error }}</span>
          </div>
          
          <div v-else-if="activeMessages.length === 0" class="empty-messages">
            <MessageCircle class="empty-icon" />
            <span>Nu există mesaje</span>
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

      <!-- Received Messages (Forms) -->
      <div class="messages-section">
        <div class="section-header" @click="toggleSection('received')">
          <div class="section-title">
            <Mail class="section-icon" />
            Mesaje Primite
            <span v-if="unreadCount > 0" class="unread-badge green">{{ unreadCount }}</span>
          </div>
          <ChevronDown 
            class="toggle-icon" 
            :class="{ 'rotated': !sectionsCollapsed.received }"
          />
        </div>
        
        <div v-if="!sectionsCollapsed.received" class="messages-list">
          <div v-if="messagesStore.loading" class="loading-state">
            <Loader class="loading-icon spinning" />
            <span>Se încarcă mesajele...</span>
          </div>
          
          <div v-else-if="messagesStore.error" class="error-state">
            <AlertCircle class="error-icon" />
            <span>{{ messagesStore.error }}</span>
          </div>
          
          <div v-else-if="activeMessages.length === 0" class="empty-messages">
            <Mail class="empty-icon" />
            <span>Nu există mesaje primite</span>
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

      <!-- Sent Messages -->
      <div class="messages-section">
        <div class="section-header" @click="toggleSection('sent')">
          <div class="section-title">
            <Send class="section-icon" />
            Mesaje Trimise
          </div>
          <ChevronDown 
            class="toggle-icon" 
            :class="{ 'rotated': !sectionsCollapsed.sent }"
          />
        </div>
        
        <div v-if="!sectionsCollapsed.sent" class="messages-list">
          <div v-if="messagesStore.sentMessagesLoading" class="loading-state">
            <Loader class="loading-icon spinning" />
            <span>Se încarcă mesajele...</span>
          </div>
          
          <div v-else-if="messagesStore.error" class="error-state">
            <AlertCircle class="error-icon" />
            <span>{{ messagesStore.error }}</span>
          </div>
          
          <div v-else-if="sentMessages.length === 0" class="empty-messages">
            <Send class="empty-icon" />
            <span>Nu există mesaje trimise</span>
          </div>
          
          <SentMessageItem
            v-else
            v-for="sentMessage in sentMessages"
            :key="sentMessage.id"
            :sent-message="sentMessage"
            :is-selected="selectedSentMessage?.id === sentMessage.id"
            @click="selectSentMessage(sentMessage)"
          />
        </div>
      </div>

      <!-- Archived Messages -->
      <div class="messages-section">
        <div class="section-header" @click="toggleSection('archived')">
          <div class="section-title">
            <Archive class="section-icon" />
            Arhivate
            <span v-if="archivedCount > 0" class="archived-badge">{{ archivedCount }}</span>
          </div>
          <ChevronDown 
            class="toggle-icon" 
            :class="{ 'rotated': !sectionsCollapsed.archived }"
          />
        </div>
        
        <div v-if="!sectionsCollapsed.archived" class="messages-list">
          <div v-if="archivedMessages.length === 0" class="empty-messages">
            <Archive class="empty-icon" />
            <span>Nu există mesaje arhivate</span>
          </div>
          
          <MessageItem
            v-else
            v-for="message in archivedMessages"
            :key="message.id"
            :message="message"
            :is-selected="selectedMessage?.id === message.id"
            @click="selectMessage(message)"
            :is-archived="true"
          />
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
  Send
} from 'lucide-vue-next'
import MessageItem from './MessageItem.vue'
import SentMessageItem from './SentMessageItem.vue'
import SettingsModal from './SettingsModal.vue'

const emit = defineEmits<{
  selectMessage: [messageId: string]
}>()

const router = useRouter()
const authStore = useAuthStore()
const messagesStore = useMessagesStore()

const showUserMenu = ref(false)
const showSettings = ref(false)
const sectionsCollapsed = ref({
  active: false,
  received: true,
  sent: true,
  archived: true,
})

const activeMessages = computed(() => messagesStore.activeMessages)
const archivedMessages = computed(() => messagesStore.archivedMessages)
const sentMessages = computed(() => messagesStore.sentMessages)
const selectedMessage = computed(() => messagesStore.selectedMessage)
const selectedSentMessage = computed(() => messagesStore.selectedSentMessage)

const unreadCount = computed(() => messagesStore.unreadMessages.length)
const activeCount = computed(() => activeMessages.value.length)
const archivedCount = computed(() => archivedMessages.value.length)
const sentCount = computed(() => messagesStore.sentMessagesCount)

function toggleSection(section: 'active' | 'archived' | 'sent') {
  sectionsCollapsed.value[section] = !sectionsCollapsed.value[section]
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

async function handleLogout() {
  authStore.logout()
  router.push('/login')
}

onMounted(() => {
  // Load sent messages when sidebar is mounted
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
}
</style>