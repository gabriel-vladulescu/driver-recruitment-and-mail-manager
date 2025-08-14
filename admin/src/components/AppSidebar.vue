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
        <!-- Debug: {{ category.name }} -->
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
              <span v-if="getTotalUnreadCount() > 0" class="unread-badge">
                {{ getTotalUnreadCount() }}
              </span>
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
            <button @click.stop="showLabelModal = true; editingLabel = null;" class="add-label-btn">
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
            <component 
              :is="getIconComponent(label.icon)" 
              class="label-icon" 
              :style="{ 
                color: selectedView.type === 'label' && selectedView.id === label.id ? 'white' : label.color,
                fill: selectedView.type === 'label' && selectedView.id === label.id ? 'none' : label.color,
                stroke: selectedView.type === 'label' && selectedView.id === label.id ? 'white' : label.color
              }"
            />
            <span>{{ label.label }}</span>
            <span v-if="getLabelCount(label.id) > 0" class="count-badge">
              {{ getLabelCount(label.id) }}
            </span>
            <div class="label-actions">
              <div class="label-menu-dropdown">
                <button 
                  @click.stop="toggleLabelMenu(label.id)"
                  class="label-menu-btn"
                  :class="{ 'active': selectedView.type === 'label' && selectedView.id === label.id }"
                >
                  <MoreVertical class="menu-icon" />
                </button>
                <div 
                  v-if="label.id && showLabelMenus[label.id]" 
                  class="label-dropdown-menu"
                  @click.stop
                >
                  <button @click="editingLabel = label; showLabelModal = true; closeLabelMenu(label.id)" class="dropdown-item">
                    <Edit class="dropdown-icon" />
                    <span>Editează</span>
                  </button>
                  <button @click="confirmDeleteLabel(label); closeLabelMenu(label.id)" class="dropdown-item delete-item">
                    <Trash class="dropdown-icon" />
                    <span>Șterge</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Archive Section -->
      <div class="messages-section archive-section">
        <div 
          class="section-header archive-header" 
          @click="selectArchiveView()"
          :class="{ 'active': selectedView.type === 'archive' }"
        >
          <div class="section-title">
            <Archive class="section-icon archive-icon" />
            <span>Arhivă</span>
            <span v-if="archivedEmailsCount > 0" class="archive-badge">{{ archivedEmailsCount }}</span>
          </div>
        </div>
      </div>

      <!-- Trash Section -->
      <div class="messages-section trash-section">
        <div 
          class="section-header trash-header" 
          @click="selectTrashView()"
          :class="{ 'active': selectedView.type === 'trash' }"
        >
          <div class="section-title">
            <Trash2 class="section-icon trash-icon" />
            <span>Coș de gunoi</span>
            <span v-if="deletedEmailsCount > 0" class="trash-badge">{{ deletedEmailsCount }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Label Management Modal -->
    <LabelModal
      :is-visible="showLabelModal"
      :label="editingLabel"
      @cancel="showLabelModal = false"
    />

    <!-- Settings Modal -->
    <SettingsModal
      :is-visible="showSettings"
      @cancel="closeSettings"
    />

    <!-- Delete Label Confirmation Modal -->
    <ConfirmDialog
      :is-visible="showDeleteConfirm"
      type="danger"
      title="Ștergere Etichetă"
      :message="`Sigur dorești să ștergi eticheta '${labelToDelete?.label}'? Această acțiune va elimina eticheta de pe toate email-urile care o folosesc.`"
      :details="getLabelDeleteDetails"
      confirm-text="Șterge"
      cancel-text="Anulează"
      @confirm="deleteLabel"
      @cancel="closeDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToastStore } from '@/stores/toast'
import { useEmailStore } from '@/stores/emailStore'
import '@/assets/modal.css'
import '@/assets/sidebar.css'
import LabelModal from './modals/LabelModal.vue'
import axios from 'axios'
import type { Label } from '@/types'
import {
  Shield,
  User,
  ChevronDown,
  LogOut,
  Settings,
  Mail,
  Inbox,
  Send,
  Archive,
  Trash2,
  Tag,
  Plus,
  X,
  Edit,
  Trash,
  Star,
  Bookmark,
  Heart,
  Flag,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Award,
  Target,
  Users,
  Calendar,
  File,
  Folder,
  Bell,
  MoreVertical
} from 'lucide-vue-next'
import SettingsModal from './modals/SettingsModal.vue'
import ConfirmDialog from './modals/ConfirmDialog.vue'

// Types
interface InboxCategory {
  id: number
  category: string
  name: string
}

// Label replaced with Label from types

interface SelectedView {
  type: 'category' | 'label' | 'all' | 'archive' | 'trash'
  id?: string | number
  data?: InboxCategory | Label
}

const emit = defineEmits<{
  selectInboxView: [view: SelectedView]
  refreshNeeded: []
}>()

const router = useRouter()
const authStore = useAuthStore()
const toastStore = useToastStore()
const emailStore = useEmailStore()

// Icon mapping for labels
const iconComponents = {
  Tag,
  Star,
  Bookmark,
  Heart,
  Flag,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Shield,
  Award,
  Target,
  Users,
  Calendar,
  Mail,
  File,
  Folder,
  Settings,
  Bell
}

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  return iconComponents[iconName as keyof typeof iconComponents] || Tag
}

// State
const showUserMenu = ref(false)
const showSettings = ref(false)
const showLabelModal = ref(false)
const editingLabel = ref<Label | null>(null)
const showDeleteConfirm = ref(false)
const labelToDelete = ref<Label | null>(null)
const showLabelMenus = ref<Record<string | number, boolean>>({})
const sectionsCollapsed = ref<Record<string, boolean>>({
  labels: false
})

// Inbox data
const inboxCategories = ref<InboxCategory[]>([])
const inboxLabels = ref<Label[]>([])
const deletedEmailsCount = ref(0)
const archivedEmailsCount = ref(0)
const selectedView = ref<SelectedView>({ type: 'all' })

// labelForm removed - LabelModal handles defaults internally

// Computed for inbox counts using counts endpoint data
const getCategoryCount = (categoryId: number) => {
  if (!countsData.value?.categories) return 0
  const category = countsData.value.categories.find((cat: any) => cat.id === categoryId)
  return category?.total || 0
}

const getCategoryUnreadCount = computed(() => {
  return (categoryId: number) => {
    if (!countsData.value?.categories) return 0
    const category = countsData.value.categories.find((cat: any) => cat.id === categoryId)
    return category?.unread || 0
  }
})

const getLabelCount = (labelId: string | number | undefined) => {
  if (!countsData.value?.labels || !labelId) return 0
  const label = countsData.value.labels.find((lbl: any) => lbl.id == labelId)
  return label?.total || 0
}

const getTotalEmailsCount = () => {
  return countsData.value?.total || 0
}

const getTotalUnreadCount = () => {
  return countsData.value?.totalUnread || 0
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

function selectLabelView(label: Label) {
  const view: SelectedView = { type: 'label', id: label.id, data: label }
  selectedView.value = view
  emit('selectInboxView', view)
}

function selectArchiveView() {
  const view: SelectedView = { type: 'archive' }
  selectedView.value = view
  emit('selectInboxView', view)
}

function selectTrashView() {
  const view: SelectedView = { type: 'trash' }
  selectedView.value = view
  emit('selectInboxView', view)
}

// Legacy message selection methods removed

function openSettings() {
  showUserMenu.value = false
  showSettings.value = true
}

function closeSettings() {
  showSettings.value = false
}

// closeLabelModal and editLabel functions removed - using inline handlers

function confirmDeleteLabel(label: Label) {
  labelToDelete.value = label
  showDeleteConfirm.value = true
}

  const getLabelDeleteDetails = computed(() => {
    if (!labelToDelete.value || !labelToDelete.value.id) return ''
    let message = '';
    
    const count = getLabelCount(labelToDelete.value.id)
    if (Number(labelToDelete.value.id) > 1) {
      return message += `${count} email-uri vor fi afectate.`;
    } else {
      return message += `${count} email va fi afectat.`;
    }
  });

function closeDeleteConfirm() {
  showDeleteConfirm.value = false
  labelToDelete.value = null
}

function toggleLabelMenu(labelId: string | number | undefined) {
  if (!labelId) return
  // Close all other menus first
  Object.keys(showLabelMenus.value).forEach(id => {
    if (id !== labelId.toString()) {
      showLabelMenus.value[id] = false
    }
  })
  // Toggle current menu
  showLabelMenus.value[labelId] = !showLabelMenus.value[labelId]
}

function closeLabelMenu(labelId: string | number | undefined) {
  if (!labelId) return
  showLabelMenus.value[labelId] = false
}

async function deleteLabel() {
  if (!labelToDelete.value) return
  
  // Store the label ID before clearing the reference
  const deletedLabelId = labelToDelete.value.id!
  const labelName = labelToDelete.value.label
  
  try {
    await axios.delete(`/api/inbox/labels/${deletedLabelId}`)
    await fetchLabels()
    await fetchEmailCounts()
    
    // If the deleted label was currently selected, switch to All view
    if (selectedView.value.type === 'label' && selectedView.value.id === deletedLabelId) {
      selectAllView()
    }
    
    toastStore.success(`Eticheta "${labelName}" a fost ștearsă cu succes!`)
    closeDeleteConfirm()
  } catch (error) {
    console.error('Error deleting label:', error)
    toastStore.error('Eroare la ștergerea etichetei')
    closeDeleteConfirm()
  }
}

// saveLabel function moved to labelService - LabelModal handles save internally

async function fetchInboxCategories() {
  try {
    const response = await axios.get('/api/inbox/categories')
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

async function fetchLabels() {
  try {
    const response = await axios.get('/api/inbox/labels')
    inboxLabels.value = response.data.data
  } catch (error) {
    console.error('Error fetching inbox labels:', error)
  }
}

// Count data from the counts endpoint
const countsData = ref<any>(null)

async function fetchEmailCounts() {
  try {
    const response = await axios.get('/api/inbox/counts')
    countsData.value = response.data.data
    deletedEmailsCount.value = countsData.value.trash || 0
    archivedEmailsCount.value = countsData.value.archive || 0
  } catch (error) {
    console.error('Error fetching email counts:', error)
    countsData.value = null
    deletedEmailsCount.value = 0
    archivedEmailsCount.value = 0
  }
}

async function handleLogout() {
  authStore.logout()
  router.push('/login')
}

// Function to update specific view counts from pagination data
const updateViewCounts = (view: any, pagination: any) => {
  if (!countsData.value) return
  
  if (view.type === 'all') {
    // Update total unread for "Toate Mesajele"
    countsData.value.totalUnread = pagination.unread
    countsData.value.total = pagination.total
  } else if (view.type === 'category' && view.id) {
    // Update specific category counts
    const category = countsData.value.categories?.find((cat: any) => cat.id === view.id)
    if (category) {
      category.total = pagination.total
      category.unread = pagination.unread
    }
  } else if (view.type === 'label' && view.id) {
    // Update specific label counts (labels don't have unread, only total)
    const label = countsData.value.labels?.find((lbl: any) => lbl.id === view.id)
    if (label) {
      label.total = pagination.total
    }
  }
}

// Expose methods for parent components
defineExpose({
  refreshInboxData: async () => {
    await fetchEmailCounts()
  },
  updateViewCounts
})

// Watch for email store updates to refresh labels
watch(() => emailStore.updateTrigger, () => {
  fetchLabels();
  fetchEmailCounts();
})

onMounted(async () => {
  // Load inbox data
  await Promise.all([
    fetchInboxCategories(),
    fetchLabels(),
    fetchEmailCounts()
  ])
  
  // Legacy message store functionality removed
  
  // Close menus when clicking outside
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target?.closest('.user-menu')) {
      showUserMenu.value = false
    }
    if (!target?.closest('.label-menu-dropdown')) {
      Object.keys(showLabelMenus.value).forEach(id => {
        showLabelMenus.value[id] = false
      })
    }
  })
})
</script>